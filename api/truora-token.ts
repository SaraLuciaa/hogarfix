import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getTruoraTokenFromServer } from "../server/truora-token.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST").end();
    return;
  }

  try {
    const { api_key } = await getTruoraTokenFromServer(process.env);
    res.status(200).json({ api_key });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    res.status(500).json({ error: msg });
  }
}
