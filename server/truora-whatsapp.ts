const TRUORA_WHATSAPP_URL =
  "https://api.connect.truora.com/v1/whatsapp/outbounds/send";

const OUTBOUND_ID = "OTB4e522ca65e8b78ca6aa0420308689b44";
const FLOW_ID = "IPF6ed3c385dbe2a352df2290f9657013ff";

export type WhatsAppRequest = {
  phone_number: string;
  country_code: string;
};

export type WhatsAppResponse = {
  success: boolean;
  data?: unknown;
};

export async function sendWhatsAppOutbound(
  env: NodeJS.ProcessEnv,
  body: WhatsAppRequest,
): Promise<WhatsAppResponse> {
  const apiKey = env.TRUORA_WHATSAPP_API_KEY;

  if (!apiKey?.trim()) {
    throw new Error(
      "Falta la variable de entorno del servidor: TRUORA_WHATSAPP_API_KEY.",
    );
  }

  if (!body.phone_number?.trim() || !body.country_code?.trim()) {
    throw new Error("Se requiere número de teléfono y código de país.");
  }

  const payload = {
    phone_number: body.phone_number.trim(),
    country_code: body.country_code.trim(),
    outbound_id: OUTBOUND_ID,
    user_authorized: true,
    flow_id: FLOW_ID,
  };

  const res = await fetch(TRUORA_WHATSAPP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Truora-API-Key": apiKey,
      "Truora-Client": "webapp",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const errJson = await res.json();
      detail =
        typeof errJson === "object" && errJson !== null && "message" in errJson
          ? String((errJson as { message?: unknown }).message ?? detail)
          : JSON.stringify(errJson);
    } catch {
      try {
        detail = await res.text();
      } catch {
        /* keep statusText */
      }
    }
    throw new Error(detail || `Error ${res.status}`);
  }

  const data = await res.json();
  return { success: true, data };
}
