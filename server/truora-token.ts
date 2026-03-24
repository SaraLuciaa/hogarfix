const TRUORA_API_KEYS_URL = "https://api.account.truora.com/v1/api-keys";

export type TruoraTokenResponse = {
  api_key: string;
};

function getRedirectUrl(
  env: NodeJS.ProcessEnv,
  origin: string | null | undefined,
): string {
  const fromEnv = env.TRUORA_REDIRECT_URL?.trim();
  if (fromEnv) return fromEnv;
  if (origin) {
    try {
      return new URL("/callback", origin).href;
    } catch {
      /* fall through */
    }
  }
  throw new Error(
    "Define TRUORA_REDIRECT_URL en el servidor o envía la petición con cabecera Origin (p. ej. desde el navegador).",
  );
}

export async function getTruoraTokenFromServer(
  env: NodeJS.ProcessEnv,
  opts: { origin?: string | null },
): Promise<TruoraTokenResponse> {
  const rootKey = env.TRUORA_ROOT_API_KEY;
  const flowId = env.TRUORA_FLOW_ID;

  if (!rootKey?.trim() || !flowId?.trim()) {
    throw new Error(
      "Faltan variables de entorno del servidor: TRUORA_ROOT_API_KEY o TRUORA_FLOW_ID.",
    );
  }

  const redirectUrl = getRedirectUrl(env, opts.origin);

  const body = new URLSearchParams({
    key_type: "web",
    api_key_version: "1",
    grant: "digital-identity",
    country: "ALL",
    redirect_url: redirectUrl,
    flow_id: flowId,
  });

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
