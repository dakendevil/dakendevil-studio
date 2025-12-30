import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3DEnhanced from "./Scene3DEnhanced";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const words = ["BOLD", "STRIKING", "ICONIC", "POWERFUL"];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord]);

  // GSAP entrance animation with cinematic reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Frame corners reveal
      tl.fromTo(
        ".corner-frame",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1 }
      )
        // Logo reveal with depth
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 1.15, y: 60, rotateX: 15 },
          { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.4 },
          "-=0.4"
        )
        // Ambient glow pulse
        .fromTo(
          ambientRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5 },
          "-=1"
        )
        // Tagline with stagger
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.6"
        )
        // Decorative line
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1 },
          "-=0.4"
        )
        // Scroll indicator
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        );

      // Scroll-triggered parallax for content
      gsap.to(logoRef.current, {
        y: -100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(ambientRef.current, {
        scale: 1.5,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor light effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.to(".cursor-light", {
        background: `radial-gradient(600px circle at ${x}% ${y}%, hsl(var(--primary) / 0.08), transparent 40%)`,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Scene */}
      <Scene3DEnhanced />

      {/* Cursor-reactive light layer */}
      <div className="cursor-light absolute inset-0 z-[1] pointer-events-none" />

      {/* Ambient Glow - Multiple layers */}
      <div ref={ambientRef} className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[200px] animate-glow-pulse" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] animate-glow-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] animate-glow-pulse delay-700" />
      </div>

      {/* Corner Frames */}
      <div ref={frameRef} className="absolute inset-8 md:inset-16 z-[2] pointer-events-none">
        <div className="corner-frame absolute top-0 left-0 w-16 h-16 border-l border-t border-primary/20" />
        <div className="corner-frame absolute top-0 right-0 w-16 h-16 border-r border-t border-primary/20" />
        <div className="corner-frame absolute bottom-0 left-0 w-16 h-16 border-l border-b border-primary/20" />
        <div className="corner-frame absolute bottom-0 right-0 w-16 h-16 border-r border-b border-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={{ transformStyle: "preserve-3d" }}>
        {/* Logo Text with depth */}
        <h1
          ref={logoRef}
          className="display-xl text-foreground tracking-wider opacity-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="inline-block crimson-glow-text hover:text-shadow-glow transition-all duration-500">
            DAKEN
          </span>
          <span className="text-primary inline-block relative">
            DEVIL
            {/* Glow underline */}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </span>
        </h1>

        {/* Dynamic Tagline */}
        <div className="mt-10 h-12 flex items-center justify-center">
          <p
            ref={taglineRef}
            className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-body font-light opacity-0"
          >
            Designs that are{" "}
            <span className="text-primary font-medium inline-block min-w-[120px] relative">
              {displayText}
              <span className="animate-pulse text-primary/70">|</span>
              {/* Glow effect behind text */}
              <span className="absolute inset-0 bg-primary/10 blur-xl -z-10" />
            </span>
          </p>
        </div>

        {/* Decorative Line with glow */}
        <div
          ref={lineRef}
          className="mx-auto mt-10 h-px w-48 origin-center scale-x-0 opacity-0 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <MagneticButton className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div
          ref={scrollRef}
          className="flex flex-col items-center gap-3 opacity-0 cursor-pointer group"
          onClick={() => {
            document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-body group-hover:text-primary transition-colors duration-300">
            Scroll
          </span>
          <div className="relative">
            <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator group-hover:text-primary transition-colors duration-300" />
            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </MagneticButton>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[3] pointer-events-none" />
    </section>
  );
};

export default Hero;
