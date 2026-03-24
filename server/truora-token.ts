const TRUORA_API_KEYS_URL = "https://api.account.truora.com/v1/api-keys";

export type TruoraTokenResponse = {
  api_key: string;
};

const DEFAULT_REDIRECT_URL = "https://hogarfix.vercel.app/";

function getRedirectUrl(env: NodeJS.ProcessEnv): string {
  const fromEnv = env.TRUORA_REDIRECT_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_REDIRECT_URL;
}

export async function getTruoraTokenFromServer(
  env: NodeJS.ProcessEnv,
): Promise<TruoraTokenResponse> {
  const rootKey = env.TRUORA_ROOT_API_KEY;
  const flowId = env.TRUORA_FLOW_ID;
  const accountId = env.TRUORA_ACCOUNT_ID?.trim();

  if (!rootKey?.trim() || !flowId?.trim()) {
    throw new Error(
      "Faltan variables de entorno del servidor: TRUORA_ROOT_API_KEY o TRUORA_FLOW_ID.",
    );
  }

  const redirectUrl = getRedirectUrl(env);

  const body = new URLSearchParams({
    key_type: "web",
    api_key_version: "1",
    grant: "digital-identity",
    country: "ALL",
    redirect_url: redirectUrl,
    flow_id: flowId,
  });

  if (accountId) {
    body.set("account_id", accountId);
  }

  const res = await fetch(TRUORA_API_KEYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Truora-API-Key": rootKey,
    },
    body: body.toString(),
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

  const data = (await res.json()) as { api_key?: string };
  if (!data.api_key || typeof data.api_key !== "string") {
    throw new Error("La respuesta no incluye un api_key válido.");
  }

  return { api_key: data.api_key };
}
