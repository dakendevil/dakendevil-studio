import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  variant?: "line" | "gradient" | "frame";
}

const SectionDivider = ({ variant = "line" }: SectionDividerProps) => {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return;

    const ctx = gsap.context(() => {
      if (variant === "line") {
        gsap.fromTo(
          divider.querySelector(".line-left"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 80%",
            },
          }
        );
        gsap.fromTo(
          divider.querySelector(".line-right"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 80%",
            },
          }
        );
      } else if (variant === "gradient") {
        gsap.fromTo(
          divider,
          { opacity: 0, scaleX: 0.5 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 85%",
            },
          }
        );
      } else if (variant === "frame") {
        gsap.fromTo(
          divider.querySelectorAll(".frame-line"),
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 85%",
            },
          }
        );
      }
    }, dividerRef);

    return () => ctx.revert();
  }, [variant]);

  if (variant === "line") {
    return (
      <div ref={dividerRef} className="w-full flex items-center justify-center py-16">
        <div className="line-left h-px w-32 bg-gradient-to-r from-transparent to-primary/50 origin-right" />
        <div className="w-2 h-2 rotate-45 border border-primary/50 mx-4" />
        <div className="line-right h-px w-32 bg-gradient-to-l from-transparent to-primary/50 origin-left" />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div ref={dividerRef} className="w-full py-16">
        <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    );
  }

  if (variant === "frame") {
    return (
      <div ref={dividerRef} className="w-full py-16 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="frame-line absolute top-0 left-0 w-full h-px bg-primary/50 origin-left" />
          <div className="frame-line absolute top-0 right-0 w-px h-full bg-primary/50 origin-top" />
          <div className="frame-line absolute bottom-0 right-0 w-full h-px bg-primary/50 origin-right" />
          <div className="frame-line absolute bottom-0 left-0 w-px h-full bg-primary/50 origin-bottom" />
        </div>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
