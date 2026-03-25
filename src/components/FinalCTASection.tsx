import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppModal from "@/components/WhatsAppModal";

const FinalCTASection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
          ¿Listo para resolver tu problema?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
          Agenda tu servicio ahora y deja que nuestros profesionales se encarguen del resto.
        </p>
        <Button
          size="lg"
          onClick={() => setModalOpen(true)}
          className="gap-2 bg-card text-foreground hover:bg-card/90 text-base px-8 py-6 rounded-xl shadow-elevated font-bold"
        >
          <MessageCircle className="h-5 w-5" />
          Agendar servicio ahora
        </Button>
      </div>

      <WhatsAppModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default FinalCTASection;
