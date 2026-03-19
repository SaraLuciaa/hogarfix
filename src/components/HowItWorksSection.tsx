import { MessageCircle, CalendarCheck, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Solicita por WhatsApp",
    description: "Cuéntanos qué necesitas y te conectamos con el profesional ideal.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Validamos y agendamos",
    description: "Confirmamos disponibilidad y programamos tu cita en el horario que prefieras.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Paga y recibe el servicio",
    description: "Realiza el pago de forma segura y disfruta de un servicio profesional.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground">
            En 3 simples pasos, tu problema queda resuelto.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-gradient-to-r from-primary/30 to-secondary/30 md:block" />
              )}
              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-hero shadow-elevated">
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                Paso {step.step}
              </span>
              <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="max-w-xs text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
