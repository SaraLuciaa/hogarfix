import { useMutation } from "@tanstack/react-query";

type WhatsAppPayload = {
  phone_number: string;
  country_code: string;
};

async function sendWhatsApp(payload: WhatsAppPayload) {
  const res = await fetch("/api/truora-whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Error ${res.status}`);
  }

  return res.json();
}

export function useTruoraWhatsApp() {
  return useMutation({ mutationFn: sendWhatsApp });
}
