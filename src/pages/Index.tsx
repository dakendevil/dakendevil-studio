import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionDivider from "@/components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth scroll behavior
    const sections = gsap.utils.toArray<HTMLElement>("section");
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>DAKENDEVIL | Luxury Graphic Design Studio</title>
        <meta 
          name="description" 
          content="DakenDevil is a luxury visual design studio crafting bold identities, apparel, and visuals that leave lasting impact. Logo design, apparel, mockups, and more." 
        />
        <meta name="keywords" content="graphic design, logo design, apparel design, mockups, luxury branding, visual identity" />
        <link rel="canonical" href="https://dakendevil.com" />
      </Helmet>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      <Navigation />
      
      <main ref={mainRef} className="scroll-smooth">
        <Hero />
        <SectionDivider variant="line" />
        <Portfolio />
        <SectionDivider variant="gradient" />
        <Services />
        <SectionDivider variant="frame" />
        <About />
        <SectionDivider variant="gradient" />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Index;
