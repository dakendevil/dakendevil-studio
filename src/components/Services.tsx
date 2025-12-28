import { Palette, Shirt, Box, FileImage } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Logo Design",
    description: "Bold identities that define brands",
  },
  {
    icon: Shirt,
    title: "Apparel Design",
    description: "DTF, screen print, embroidery",
  },
  {
    icon: Box,
    title: "Mockup Building",
    description: "Photorealistic product visualization",
  },
  {
    icon: FileImage,
    title: "Poster & Banner",
    description: "Event graphics that command attention",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2 className="display-lg text-foreground mb-4">Services</h2>
          <div className="w-16 h-px bg-primary" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 border border-border bg-background transition-all duration-500 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mb-6">
                <service.icon 
                  className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-500" 
                  strokeWidth={1}
                />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-display text-2xl text-foreground tracking-wide mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body font-light">
                  {service.description}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-px h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <div className="absolute bottom-0 right-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
