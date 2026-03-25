import { useState } from "react";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTruoraWhatsApp } from "@/hooks/useTruoraWhatsApp";

const COUNTRY_CODES = [
  { value: "57", label: "Colombia (+57)" },
  { value: "52", label: "México (+52)" },
  { value: "54", label: "Argentina (+54)" },
  { value: "56", label: "Chile (+56)" },
  { value: "51", label: "Perú (+51)" },
  { value: "593", label: "Ecuador (+593)" },
  { value: "58", label: "Venezuela (+58)" },
  { value: "55", label: "Brasil (+55)" },
  { value: "1", label: "Estados Unidos (+1)" },
  { value: "34", label: "España (+34)" },
];

type WhatsAppModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const WhatsAppModal = ({ open, onOpenChange }: WhatsAppModalProps) => {
  const [countryCode, setCountryCode] = useState("57");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sent, setSent] = useState(false);

  const mutation = useTruoraWhatsApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    mutation.mutate(
      { phone_number: phoneNumber.trim(), country_code: countryCode },
      {
        onSuccess: () => setSent(true),
      },
    );
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setTimeout(() => {
        setPhoneNumber("");
        setCountryCode("57");
        setSent(false);
        mutation.reset();
      }, 200);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-whatsapp" />
            Solicitar servicio por WhatsApp
          </DialogTitle>
          <DialogDescription>
            Ingresa tu número de celular y te contactaremos por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle2 className="h-12 w-12 text-whatsapp" />
            <p className="text-center text-sm text-muted-foreground">
              Te enviaremos un mensaje de WhatsApp en breve. Revisa tu celular.
            </p>
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cerrar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Código de país
              </label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Número de celular
              </label>
              <div className="flex items-center gap-2">
                <span className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                  +{countryCode}
                </span>
                <Input
                  type="tel"
                  placeholder="3001234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            {mutation.isError && (
              <p className="text-sm text-destructive">
                {mutation.error?.message ?? "Ocurrió un error. Intenta de nuevo."}
              </p>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending || !phoneNumber.trim()}
              className="gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
              {mutation.isPending ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
