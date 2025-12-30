import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(parallaxBgRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text animation with mask reveal
      gsap.fromTo(
        textRef.current,
        { 
          opacity: 0, 
          x: -100,
          clipPath: "inset(0 100% 0 0)"
        },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Text lines staggered reveal
      gsap.fromTo(
        ".about-text-line",
        { 
          opacity: 0, 
          y: 40,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
          },
        }
      );

      // Visual element 3D entrance
      gsap.fromTo(
        visualRef.current,
        { 
          opacity: 0, 
          scale: 0.7, 
          rotateY: -30,
          rotateX: 15
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        }
      );

      // Animate frame elements
      gsap.fromTo(
        ".frame-element",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on visual element
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const visual = visualRef.current;
    if (!visual) return;

    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -15;
    const rotateY = (x - 0.5) * 15;

    gsap.to(visual, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const visual = visualRef.current;
    if (!visual) return;

    gsap.to(visual, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div ref={parallaxBgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[700px] bg-gradient-to-l from-primary/8 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-primary/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full" />
      </div>
      
      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          style={{ perspective: "1500px" }}
        >
          {/* Text Content */}
          <div ref={textRef}>
            <h2 className="about-text-line display-lg text-foreground mb-8">About</h2>
            <div className="about-text-line w-16 h-px bg-primary mb-10" />
            <p className="about-text-line text-xl md:text-2xl text-muted-foreground font-body font-light leading-relaxed mb-6">
              DakenDevil is a visual design studio crafting bold identities, 
              apparel, and visuals that leave{" "}
              <span className="text-foreground relative inline-block">
                lasting impact
                <span className="absolute -bottom-1 left-0 w-full h-px bg-primary/50" />
              </span>.
            </p>
            <p className="about-text-line text-muted-foreground font-body font-light leading-relaxed">
              Based on precision, intention, and a refusal to be ordinary.
            </p>
            
            {/* Stats or values */}
            <div className="about-text-line mt-12 flex gap-12">
              <div>
                <span className="display-md text-primary">50+</span>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Projects</p>
              </div>
              <div>
                <span className="display-md text-primary">5+</span>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">Years</p>
              </div>
            </div>
          </div>

          {/* Visual Element with 3D interaction */}
          <div 
            ref={visualRef} 
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="aspect-square relative">
              {/* Glassmorphism background */}
              <div className="absolute inset-0 bg-card/30 backdrop-blur-sm border border-border/30" />
              
              {/* Decorative Frame */}
              <div className="frame-element absolute inset-8 border border-border/50" />
              <div className="frame-element absolute inset-14 border border-primary/20" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>
              
              {/* Center Logo Mark */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                <div className="text-center relative">
                  <span className="display-lg text-primary relative">
                    DD
                    <span className="absolute inset-0 bg-primary/20 blur-2xl" />
                  </span>
                  <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </div>
              </div>

              {/* Corner Accents with animation */}
              <div className="frame-element absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
              <div className="frame-element absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
              <div className="frame-element absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
              <div className="frame-element absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/60" />
              
              {/* Floating accent elements */}
              <div className="absolute top-1/4 right-8 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
              <div className="absolute bottom-1/4 left-8 w-16 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
