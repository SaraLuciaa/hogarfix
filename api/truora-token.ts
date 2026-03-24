import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getTruoraTokenFromServer } from "../server/truora-token";

function headerString(h: string | string[] | undefined): string | undefined {
  if (typeof h === "string") return h;
  if (Array.isArray(h)) return h[0];
  return undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST").end();
    return;
  }

  try {
    const origin = headerString(req.headers.origin);
    const { code } = await getTruoraTokenFromServer(process.env, { origin });
    res.status(200).json({ code });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    res.status(500).json({ error: msg });
  }
}
