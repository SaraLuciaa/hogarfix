import type { VercelRequest, VercelResponse } from "@vercel/node";

import { sendWhatsAppOutbound } from "../server/truora-whatsapp.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST").end();
    return;
  }

  try {
    const { phone_number, country_code } = req.body ?? {};
    const result = await sendWhatsAppOutbound(process.env, {
      phone_number,
      country_code,
    });
    res.status(200).json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    res.status(500).json({ error: msg });
  }
}
