import { TruoraVerification } from "@/components/TruoraModal";
import { Handshake } from "lucide-react";

const PartnerSection = () => {
  return (
    <section id="aliados" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Trabaja con nosotros
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              ¿Eres técnico o profesional del hogar? Únete a nuestra red de aliados verificados y recibe solicitudes de servicio todos los días.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-6 py-4">
              <Handshake className="h-5 w-5 text-primary" />
              <span className="font-semibold text-card-foreground">Registro de aliados</span>
            </div>
            <div className="px-6 py-10">
              <TruoraVerification />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
