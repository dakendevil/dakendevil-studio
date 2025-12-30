import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Shirt, Box, FileImage, Image } from "lucide-react";
import GlassCard from "./GlassCard";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: "Logo Design",
    description: "Bold identities that define brands",
    link: "/logo-design",
  },
  {
    icon: Shirt,
    title: "Apparel Design",
    description: "DTF, screen print, embroidery",
    link: "/apparel",
  },
  {
    icon: Box,
    title: "Mockups",
    description: "Photorealistic product visualization",
    link: "/mockups",
  },
  {
    icon: FileImage,
    title: "Posters",
    description: "Event graphics that command attention",
    link: "/posters",
  },
  {
    icon: Image,
    title: "Banners",
    description: "Trade show & event displays",
    link: "/banners",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with mask
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -80, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Cards cinematic stagger with 3D entrance
      gsap.fromTo(
        ".service-card",
        { 
          opacity: 0, 
          y: 100, 
          rotateX: 25,
          scale: 0.8,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -15;
    const rotateY = (x - 0.5) * 15;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });

    // Move glow
    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        x: (x - 0.5) * 80,
        y: (y - 0.5) * 80,
        opacity: 0.6,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-primary/3 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-end gap-6">
            <h2 className="display-lg text-foreground">Services</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent mb-4" />
          </div>
          <div className="w-16 h-px bg-primary mt-4" />
        </div>

        {/* Grid */}
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5" 
          style={{ perspective: "1500px" }}
        >
          {services.map((service, index) => (
            <Link
              to={service.link}
              key={service.title}
              className="service-card group relative p-8 border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-background/50 backdrop-blur-xl" />
              
              {/* Animated glow */}
              <div className="card-glow absolute w-32 h-32 bg-primary/40 rounded-full blur-3xl opacity-0 pointer-events-none" 
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} 
              />
              
              {/* Top shine on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon with glow */}
              <div className="relative mb-8">
                <service.icon 
                  className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-all duration-500" 
                  strokeWidth={1}
                />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-display text-2xl text-foreground tracking-wide mb-3 group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner Accent with animation */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-px h-0 bg-primary group-hover:h-full transition-all duration-500 ease-out-expo" />
                <div className="absolute bottom-0 right-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 delay-100 ease-out-expo" />
              </div>

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
