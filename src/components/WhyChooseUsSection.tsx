import { Clock, ShieldCheck, Lock, Smartphone } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Agendamiento rápido",
    description: "Programa tu servicio en minutos, sin complicaciones.",
  },
  {
    icon: ShieldCheck,
    title: "Profesionales verificados",
    description: "Cada técnico pasa por un proceso de validación riguroso.",
  },
  {
    icon: Lock,
    title: "Pagos seguros",
    description: "Transacciones protegidas para tu tranquilidad.",
  },
  {
    icon: Smartphone,
    title: "Fácil por WhatsApp",
    description: "Todo el proceso desde tu aplicación favorita de mensajería.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground">
            Confianza, rapidez y calidad en cada servicio.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-card transition-all duration-300 hover:shadow-elevated"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <reason.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mb-1 font-bold text-card-foreground">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
