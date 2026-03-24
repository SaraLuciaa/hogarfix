import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import { useTruoraToken } from "@/hooks/useTruoraToken";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TruoraModalProps = {
  children: React.ReactNode;
};

export function TruoraModal({ children }: TruoraModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate, reset, isPending, isError, isSuccess, data, error } = useTruoraToken();

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[min(100vw-2rem,56rem)] gap-0 overflow-hidden p-0 sm:max-w-[min(100vw-2rem,56rem)]">
        <div className="border-b border-border px-6 pb-4 pt-6">
          <DialogHeader>
            <DialogTitle>Registro de aliados</DialogTitle>
            <DialogDescription>
              Completa la verificación de identidad para unirte a nuestra red de profesionales.
            </DialogDescription>
          </DialogHeader>
        </div>

        {open ? (
          <TruoraModalBody
            mutate={mutate}
            isPending={isPending}
            isError={isError}
            isSuccess={isSuccess}
            data={data}
            error={error}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type BodyProps = {
  mutate: ReturnType<typeof useTruoraToken>["mutate"];
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: { code: string } | undefined;
  error: Error | null;
};

function TruoraModalBody({
  mutate,
  isPending,
  isError,
  isSuccess,
  data,
  error,
}: BodyProps) {
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 bg-muted/20 px-6 py-12">
        <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
        <p className="text-sm text-muted-foreground">Preparando el formulario seguro…</p>
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="space-y-6 px-6 py-8">
        <Alert variant="destructive" className="border-destructive/40 bg-destructive/5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No pudimos cargar el formulario</AlertTitle>
          <AlertDescription className="text-destructive/90">
            {error.message}
          </AlertDescription>
        </Alert>
        <Button type="button" onClick={() => mutate()}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (isSuccess && data?.code) {
    return (
      <div className="bg-muted/10 p-2 sm:p-4">
        <iframe
          src={`https://identity.truora.com/?token=${encodeURIComponent(data.code)}`}
          allow="camera"
          title="Verificación de identidad Truora"
          className="h-[700px] w-full rounded-xl border-none"
        />
      </div>
    );
  }

  return null;
}
