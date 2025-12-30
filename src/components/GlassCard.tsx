import { useRef, ReactNode } from "react";
import gsap from "gsap";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

const GlassCard = ({ children, className = "", glowColor = "primary" }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const shine = shineRef.current;
    if (!card || !glow || !shine) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -15;
    const rotateY = (x - 0.5) * 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });

    // Move glow with cursor
    gsap.to(glow, {
      x: (x - 0.5) * 100,
      y: (y - 0.5) * 100,
      opacity: 0.6,
      duration: 0.4,
      ease: "power2.out",
    });

    // Shine effect
    gsap.to(shine, {
      x: `${x * 100}%`,
      y: `${y * 100}%`,
      opacity: 0.15,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const shine = shineRef.current;
    if (!card || !glow || !shine) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(shine, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background glassmorphism */}
      <div className="absolute inset-0 bg-card/50 backdrop-blur-xl border border-border/50" />
      
      {/* Glow effect */}
      <div
        ref={glowRef}
        className={`absolute w-32 h-32 rounded-full bg-${glowColor}/30 blur-3xl opacity-0 pointer-events-none`}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
      
      {/* Shine effect */}
      <div
        ref={shineRef}
        className="absolute w-48 h-48 rounded-full bg-foreground/20 blur-2xl opacity-0 pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
