import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=Hola,%20quiero%20solicitar%20un%20servicio", "_blank");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="text-xl font-extrabold tracking-tight text-foreground">
          Hogar<span className="text-primary">Fix</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#servicios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#aliados" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Aliados</a>
          <Button size="sm" onClick={handleWhatsApp} className="gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 rounded-lg">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-border bg-card px-4 py-4 md:hidden">
          <a href="#servicios" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Servicios</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Cómo funciona</a>
          <a href="#aliados" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Aliados</a>
          <Button size="sm" onClick={handleWhatsApp} className="gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 rounded-lg w-full">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
