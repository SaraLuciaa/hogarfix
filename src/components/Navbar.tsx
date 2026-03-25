import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
