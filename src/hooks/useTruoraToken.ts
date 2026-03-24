import { useMutation } from "@tanstack/react-query";

export type TruoraTokenResponse = {
  api_key: string;
};

async function fetchTruoraToken(): Promise<TruoraTokenResponse> {
  const res = await fetch("/api/truora-token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const data = (await res.json()) as { api_key?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }

  if (!data.api_key || typeof data.api_key !== "string") {
    throw new Error("La respuesta no incluye un api_key válido.");
  }

  return { api_key: data.api_key };
}

export function useTruoraToken() {
  return useMutation<TruoraTokenResponse, Error, void>({
    mutationKey: ["truora-token"],
    mutationFn: fetchTruoraToken,
  });
}
