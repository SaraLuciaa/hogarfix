import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Gracias = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-4 text-center">
      <CheckCircle className="mb-6 h-16 w-16 text-primary" />
      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        ¡Gracias por querer hacer parte de nuestro equipo!
      </h1>
      <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
        Nos contactaremos contigo para completar el proceso.
      </p>
      <Button asChild variant="outline" size="lg" className="rounded-xl">
        <Link to="/">Volver al inicio</Link>
      </Button>
    </main>
  );
};

export default Gracias;
