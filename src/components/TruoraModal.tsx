import { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TruoraModalProps = {
  children: React.ReactNode;
};

export function TruoraModal({ children }: TruoraModalProps) {
  const [open, setOpen] = useState(false);
  const [manualKey, setManualKey] = useState("");
  const [manualSubmitted, setManualSubmitted] = useState(false);
  const { mutate, reset, isPending, isError, isSuccess, data, error } = useTruoraToken();

  const iframeToken = useMemo(() => {
    if (manualSubmitted && manualKey.trim()) return manualKey.trim();
    if (isSuccess && data?.api_key) return data.api_key;
    return null;
  }, [manualSubmitted, manualKey, isSuccess, data?.api_key]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          reset();
          setManualKey("");
          setManualSubmitted(false);
        }
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
          iframeToken ? (
            <TruoraIframe token={iframeToken} />
          ) : (
            <TruoraModalBody
              manualKey={manualKey}
              onManualKeyChange={setManualKey}
              onManualSubmit={() => setManualSubmitted(true)}
              mutate={mutate}
              isPending={isPending}
              isError={isError}
              error={error}
            />
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function TruoraIframe({ token }: { token: string }) {
  return (
    <div className="bg-muted/10 p-2 sm:p-4">
      <iframe
        src={`https://identity.truora.com/?token=${token}`}
        allow="camera"
        title="Verificación de identidad Truora"
        className="rounded-xl border-none"
        width="450"
        height="700"
      ></iframe>
    </div>
  );
}

type BodyProps = {
  manualKey: string;
  onManualKeyChange: (value: string) => void;
  onManualSubmit: () => void;
  mutate: ReturnType<typeof useTruoraToken>["mutate"];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function TruoraModalBody({
  manualKey,
  onManualKeyChange,
  onManualSubmit,
  mutate,
  isPending,
  isError,
  error,
}: BodyProps) {
  const [tab, setTab] = useState("server");

  const handleManualLoad = () => {
    if (!manualKey.trim()) return;
    onManualSubmit();
  };

  return (
    <div className="space-y-4 px-6 py-6">
      <Tabs
        value={tab}
        onValueChange={(v) => {
          setTab(v);
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="server">Desde el servidor</TabsTrigger>
          <TabsTrigger value="manual">Ingresar API key</TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Obtén un token seguro usando la configuración del sitio (variables de entorno en el servidor).
          </p>
          {isError && error ? (
            <Alert variant="destructive" className="border-destructive/40 bg-destructive/5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No pudimos cargar el formulario</AlertTitle>
              <AlertDescription className="text-destructive/90">{error.message}</AlertDescription>
            </Alert>
          ) : null}
          {isPending ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg bg-muted/20 py-8">
              <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
              <p className="text-sm text-muted-foreground">Preparando el formulario seguro…</p>
            </div>
          ) : (
            <Button type="button" className="w-full sm:w-auto" onClick={() => mutate()} disabled={isPending}>
              Cargar formulario
            </Button>
          )}
        </TabsContent>

        <TabsContent value="manual" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Si ya tienes un token o API key de Truora, pégalo aquí para abrir el formulario sin pasar por el servidor.
          </p>
          <div className="space-y-2">
            <Label htmlFor="truora-manual-api-key">API key / token</Label>
            <Input
              id="truora-manual-api-key"
              type="password"
              autoComplete="off"
              placeholder="Pega tu token aquí"
              value={manualKey}
              onChange={(e) => onManualKeyChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleManualLoad();
              }}
            />
          </div>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={handleManualLoad}
            disabled={!manualKey.trim()}
          >
            Cargar formulario
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
