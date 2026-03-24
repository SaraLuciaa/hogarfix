import { useMutation } from "@tanstack/react-query";

export type TruoraTokenResponse = {
  code: string;
};

async function fetchTruoraToken(): Promise<TruoraTokenResponse> {
  const res = await fetch("/api/truora-token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const data = (await res.json()) as { code?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }

  if (!data.code || typeof data.code !== "string") {
    throw new Error("La respuesta no incluye un token (code) válido.");
  }

  return { code: data.code };
}

export function useTruoraToken() {
  return useMutation<TruoraTokenResponse, Error, void>({
    mutationKey: ["truora-token"],
    mutationFn: fetchTruoraToken,
  });
}
