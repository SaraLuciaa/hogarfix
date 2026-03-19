import { Wrench, Zap, Settings } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Plomería",
    description: "Reparaciones, instalaciones y mantenimiento de tuberías y sistemas de agua.",
    emoji: "🔧",
  },
  {
    icon: Zap,
    title: "Electricidad",
    description: "Instalaciones eléctricas, reparaciones y diagnósticos profesionales.",
    emoji: "⚡",
  },
  {
    icon: Settings,
    title: "Instalaciones",
    description: "Montaje de muebles, electrodomésticos y equipos del hogar.",
    emoji: "🛠️",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Nuestros servicios
          </h2>
          <p className="text-lg text-muted-foreground">
            Todo lo que tu hogar necesita, en un solo lugar.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-card p-8 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-2xl">
                {service.emoji}
              </div>
              <h3 className="mb-2 text-xl font-bold text-card-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
