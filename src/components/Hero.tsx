import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-[2000ms]"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo Text */}
        <h1 
          className={`display-xl text-foreground tracking-wider transition-all duration-1000 ease-out-expo ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <span className="inline-block crimson-glow-text">DAKEN</span>
          <span className="text-primary">DEVIL</span>
        </h1>

        {/* Tagline */}
        <p 
          className={`mt-6 text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-body font-light transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Designs that speak louder than words
        </p>

        {/* Decorative Line */}
        <div 
          className={`mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-1000 delay-700 ${
            isLoaded ? "w-32 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-body">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
      </div>
    </section>
  );
};

export default Hero;
