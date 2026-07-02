import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";

const MAX_CHARS = 60_000;

/** Extract plain text from an uploaded CV file (PDF, DOCX, or plain text). */
export async function extractCvText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const type = file.type || "";
  const buf = Buffer.from(await file.arrayBuffer());

  let text: string;

  if (name.endsWith(".pdf") || type === "application/pdf") {
    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const result = await extractText(pdf, { mergePages: true });
    text = Array.isArray(result.text) ? result.text.join("\n") : result.text;
  } else if (
    name.endsWith(".docx") ||
    type.includes("officedocument.wordprocessing") ||
    type === "application/msword"
  ) {
    const result = await mammoth.extractRawText({ buffer: buf });
    text = result.value;
  } else if (name.endsWith(".txt") || name.endsWith(".md") || type.startsWith("text/")) {
    text = buf.toString("utf-8");
  } else {
    throw new Error("UNSUPPORTED_FILE");
  }

  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_CHARS);
}
