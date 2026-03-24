import { AlertCircle, Handshake, Loader2 } from "lucide-react";

import { useTruoraToken } from "@/hooks/useTruoraToken";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function TruoraVerification() {
  const { mutate, isPending, isError, isSuccess, data, error } = useTruoraToken();

  if (isSuccess && data?.api_key) {
    return (
      <div className="flex justify-center rounded-2xl bg-muted/10 p-2 sm:p-4">
        <iframe
          src={`https://identity.truora.com/?token=${data.api_key}`}
          allow="camera"
          title="Verificación de identidad Truora"
          className="rounded-xl border-none"
          width="450"
          height="700"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isError && error ? (
        <Alert variant="destructive" className="border-destructive/40 bg-destructive/5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No pudimos cargar el formulario</AlertTitle>
          <AlertDescription className="text-destructive/90">{error.message}</AlertDescription>
        </Alert>
      ) : null}

      {isPending ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl bg-muted/20 py-8">
          <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
          <p className="text-sm text-muted-foreground">Preparando el formulario seguro…</p>
        </div>
      ) : (
        <div className="text-center">
          <Button
            size="lg"
            className="gap-2 rounded-xl bg-primary px-8 py-6 text-base text-primary-foreground shadow-elevated hover:bg-primary/90"
            onClick={() => mutate()}
            disabled={isPending}
          >
            <Handshake className="h-5 w-5" />
            Quiero ser aliado
          </Button>
        </div>
      )}
    </div>
  );
}
