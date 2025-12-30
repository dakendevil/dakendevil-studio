import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import Scene3D from "./Scene3D";

const words = ["BOLD", "STRIKING", "ICONIC", "POWERFUL"];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 1.1, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Scene */}
      <Scene3D />

      {/* Ambient Glow */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo Text */}
        <h1
          ref={logoRef}
          className="display-xl text-foreground tracking-wider opacity-0"
        >
          <span className="inline-block crimson-glow-text">DAKEN</span>
          <span className="text-primary">DEVIL</span>
        </h1>

        {/* Dynamic Tagline */}
        <div className="mt-8 h-12 flex items-center justify-center">
          <p
            ref={taglineRef}
            className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-body font-light opacity-0"
          >
            Designs that are{" "}
            <span className="text-primary font-medium inline-block min-w-[120px]">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </p>
        </div>

        {/* Decorative Line */}
        <div
          ref={lineRef}
          className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center scale-x-0"
        />
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
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
