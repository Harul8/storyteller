import { readUsage } from "@/lib/usage";

export const runtime = "nodejs";

// GET /api/usage — returns accumulated token/cost totals since tracking started.
export async function GET() {
  return Response.json(readUsage());
}
