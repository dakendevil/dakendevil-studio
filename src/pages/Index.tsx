import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
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

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      <Navigation />
      
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Index;
