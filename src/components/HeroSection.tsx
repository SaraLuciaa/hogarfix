import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-technician.png";

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=Hola,%20quiero%20solicitar%20un%20servicio", "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 self-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground lg:self-start">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Servicios del hogar confiables
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Tu hogar en las{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                mejores manos
              </span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
              Conectamos tu hogar con profesionales verificados. Solicita plomería, electricidad o instalaciones en minutos.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 text-base px-8 py-6 rounded-xl shadow-elevated"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar servicio por WhatsApp
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroImage}
              alt="Técnico profesional de HogarFix"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
