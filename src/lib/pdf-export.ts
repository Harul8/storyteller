import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { COACH_OPEN_TRIGGER, stripTopicTag } from "./coaching";
import type { Analysis } from "./types";

interface TranscriptSource {
  analysis: Analysis;
  targetRole?: string;
  messages: { role: string; content: string }[];
  savedAt?: number;
}

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

// pdf-lib's standard fonts only encode WinAnsi — normalise typographic
// punctuation an LLM commonly emits instead of risking an encoding crash on
// a stray character.
function sanitizeForPdf(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x00-\x7E\n]/g, "");
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    if (para.trim() === "") {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of para.split(/\s+/)) {
      const attempt = current ? `${current} ${word}` : word;
      if (current && font.widthOfTextAtSize(attempt, size) > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = attempt;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

export async function exportTranscriptPdf(source: TranscriptSource): Promise<void> {
  const { analysis, targetRole, messages, savedAt } = source;

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await doc.embedFont(StandardFonts.HelveticaOblique);

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  function ensureSpace(needed: number) {
    if (y - needed < MARGIN) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  function drawLines(lines: string[], size: number, useFont: PDFFont, color = rgb(0.15, 0.15, 0.18), lineGap = 4) {
    for (const line of lines) {
      ensureSpace(size + lineGap);
      if (line) page.drawText(sanitizeForPdf(line), { x: MARGIN, y, size, font: useFont, color });
      y -= size + lineGap;
    }
  }

  // Bullet marker is a plain hyphen, not a typographic bullet — sanitizeForPdf
  // strips non-ASCII characters it doesn't explicitly normalise, so a real "•"
  // would silently vanish rather than render.
  function drawBulletList(items: string[], size: number, useFont: PDFFont, color: ReturnType<typeof rgb>) {
    const indent = 14;
    for (const item of items) {
      const lines = wrapText(sanitizeForPdf(item), useFont, size, CONTENT_WIDTH - indent);
      lines.forEach((line, i) => {
        ensureSpace(size + 3);
        if (i === 0) page.drawText("-", { x: MARGIN + 2, y, size, font: useFont, color });
        if (line) page.drawText(sanitizeForPdf(line), { x: MARGIN + indent, y, size, font: useFont, color });
        y -= size + 3;
      });
    }
  }

  function drawSectionHeading(text: string) {
    ensureSpace(12 + 6);
    drawLines([sanitizeForPdf(text)], 11, boldFont, rgb(0.5, 0.5, 0.55), 8);
  }

  drawLines([sanitizeForPdf("Story Coach — Session Transcript")], 18, boldFont, rgb(0.1, 0.1, 0.4), 8);
  if (analysis.candidateName) {
    drawLines([sanitizeForPdf(analysis.candidateName)], 13, boldFont, rgb(0.1, 0.1, 0.15), 4);
  }
  drawLines(
    [sanitizeForPdf(`${analysis.detectedRole ?? ""}${analysis.seniority ? `  ·  ${analysis.seniority}` : ""}`)],
    11,
    font,
    rgb(0.35, 0.35, 0.4),
    6,
  );
  if (targetRole) {
    drawLines(wrapText(sanitizeForPdf(`Target: ${targetRole}`), italicFont, 10, CONTENT_WIDTH), 10, italicFont, rgb(0.4, 0.4, 0.45), 4);
  }
  drawLines([new Date(savedAt ?? Date.now()).toLocaleString()], 9, font, rgb(0.55, 0.55, 0.6), 14);

  // Resume Analysis Snapshot — same content and order as the on-screen
  // collapsible of the same name: headline, then Strengths, then Gaps.
  const hasSnapshot = Boolean(
    analysis.headline || (analysis.strengths && analysis.strengths.length) || (analysis.gaps && analysis.gaps.length),
  );
  if (hasSnapshot) {
    drawSectionHeading("RESUME ANALYSIS SNAPSHOT");
    if (analysis.headline) {
      drawLines(wrapText(sanitizeForPdf(analysis.headline), italicFont, 10.5, CONTENT_WIDTH), 10.5, italicFont, rgb(0.3, 0.3, 0.35), 4);
      y -= 6;
    }
    if (analysis.strengths && analysis.strengths.length > 0) {
      drawLines(["Strengths"], 9, boldFont, rgb(0.4, 0.4, 0.45), 4);
      drawBulletList(analysis.strengths, 10, font, rgb(0.15, 0.15, 0.18));
      y -= 6;
    }
    if (analysis.gaps && analysis.gaps.length > 0) {
      drawLines(["Gaps"], 9, boldFont, rgb(0.4, 0.4, 0.45), 4);
      drawBulletList(analysis.gaps, 10, font, rgb(0.15, 0.15, 0.18));
      y -= 6;
    }
  }

  ensureSpace(16);
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 20;

  const realMessages = messages.filter((m) => m.content.trim() && m.content !== COACH_OPEN_TRIGGER);
  for (const m of realMessages) {
    const label = m.role === "user" ? "You" : "Coach";
    const labelColor = m.role === "user" ? rgb(0.29, 0.33, 0.85) : rgb(0.2, 0.55, 0.4);
    const text = sanitizeForPdf(stripTopicTag(m.content));

    ensureSpace(14 + 12);
    page.drawText(label, { x: MARGIN, y, size: 10, font: boldFont, color: labelColor });
    y -= 14;

    drawLines(wrapText(text, font, 10.5, CONTENT_WIDTH), 10.5, font, rgb(0.15, 0.15, 0.18), 3);
    y -= 10;
  }

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const safeRole = (analysis.detectedRole || "session").replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-");

  const a = document.createElement("a");
  a.href = url;
  a.download = `story-coach-${safeRole || "session"}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
