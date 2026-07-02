# Story Coach

An AI interview-storytelling coach for IT services professionals. Upload a CV (PDF, DOCX, or paste text) and the app:

1. **Analyzes** it — detects the role/seniority, surfaces strengths and undersold gaps, and proposes story angles, per-project framing, and likely interview questions.
2. Opens an **interactive coaching chat** that helps the candidate present their experience compellingly (STAR structure, quantified impact, tricky-question prep), grounded in their actual CV.

Built for engineers and consultants across the stack — Java, .NET, front-end, back-end, data, cloud, managed services, platform specialists (Pega, Salesforce, SAP, Oracle) — plus business analysts, project and program managers.

## Provider & model choice

Pick the AI provider and model from the UI (on the upload screen, and in the chat header):

| Provider | Models |
| --- | --- |
| Anthropic (Claude) | Claude Sonnet 4.6 |
| OpenAI | GPT-5 mini, GPT-4.1 mini, GPT-4o mini |

You only need an API key for the provider(s) you actually use.

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **Anthropic** via `@anthropic-ai/sdk` and **OpenAI** via `openai`, behind one provider-agnostic layer (`src/lib/llm.ts`)
- CV parsing: `unpdf` (PDF) and `mammoth` (DOCX), server-side
- Streaming coaching responses; no database (CV + conversation live in the browser session)

## Setup

1. Add the key(s) for the provider(s) you want to use to `.env.local`, then restart the dev server:

   ```
   ANTHROPIC_API_KEY=sk-ant-...     # for Claude
   OPENAI_API_KEY=sk-...            # for OpenAI
   ```

2. Install dependencies (already done if you scaffolded here):

   ```
   npm install
   ```

3. Run the dev server:

   ```
   npm run dev
   ```

   Open http://localhost:3000.

## How it works

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Client UI: CV input -> analysis report + coaching chat, plus the provider/model picker |
| `src/app/api/analyze/route.ts` | Extracts CV text, runs the analysis, returns a structured `Analysis` |
| `src/app/api/chat/route.ts` | Streams coaching replies, grounded in the CV + analysis |
| `src/lib/llm.ts` | Provider-agnostic analyze + streaming-chat layer (Anthropic / OpenAI) |
| `src/lib/models.ts` | Provider + model allowlist, shared by the UI and the API |
| `src/lib/extract.ts` | PDF / DOCX / text extraction |
| `src/lib/prompts.ts` | Analysis and coach system prompts |
| `src/lib/types.ts` | Shared `Analysis` / `ChatMessage` types |

## Notes / next steps

- No accounts or persistence yet — refreshing the page clears the session.
- The CV is sent only to the provider you select; nothing is stored server-side.
- Possible follow-ups: save/share sessions, export the analysis, role-play mock interviews, and CV-document rewriting (this MVP focuses on interview storytelling).
