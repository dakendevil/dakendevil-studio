import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import zeusMode from "@/assets/apparel/zeus-mode.png";
import divine from "@/assets/apparel/divine.png";
import fearOfGod from "@/assets/apparel/fear-of-god.png";
import isaiah from "@/assets/apparel/isaiah.png";
import cathedral from "@/assets/apparel/cathedral.png";
import rapha from "@/assets/apparel/rapha.png";
import fruitOfSpirit from "@/assets/apparel/fruit-of-spirit.png";
import chosenVessel from "@/assets/apparel/chosen-vessel.png";
import wdc from "@/assets/apparel/wdc.png";
import strangerThingsHoodie from "@/assets/apparel/stranger-things-hoodie.png";
import strangerThingsBack from "@/assets/apparel/stranger-things-back.png";
import tribalFire from "@/assets/apparel/tribal-fire.png";
import celestialWings from "@/assets/apparel/celestial-wings.png";
import faithBeige from "@/assets/apparel/faith-beige.png";
import strangerThingsFront from "@/assets/apparel/stranger-things-front.png";
import karanAujlaBack from "@/assets/apparel/karan-aujla-back.png";
import karanAujlaFront from "@/assets/apparel/karan-aujla-front.png";
import believeInLuke from "@/assets/apparel/believe-in-luke.png";
import alienBlues from "@/assets/apparel/alien-blues.png";
import wwyn from "@/assets/apparel/wwyn.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "Zeus Mode Tee", year: "2024", image: zeusMode },
  { id: 2, title: "Divine Collection", year: "2024", image: divine },
  { id: 3, title: "Fear of God Tee", year: "2024", image: fearOfGod },
  { id: 4, title: "Isaiah 14:27", year: "2024", image: isaiah },
  { id: 5, title: "Cathedral Collection", year: "2024", image: cathedral },
  { id: 6, title: "Rapha Healer", year: "2024", image: rapha },
  { id: 7, title: "Fruit of the Spirit", year: "2024", image: fruitOfSpirit },
  { id: 8, title: "Chosen Vessel", year: "2024", image: chosenVessel },
  { id: 9, title: "WDC Collection", year: "2024", image: wdc },
  { id: 10, title: "Stranger Things Hoodie", year: "2024", image: strangerThingsHoodie },
  { id: 11, title: "Stranger Things Back", year: "2024", image: strangerThingsBack },
  { id: 12, title: "Tribal Fire Tee", year: "2024", image: tribalFire },
  { id: 13, title: "Celestial Wings", year: "2024", image: celestialWings },
  { id: 14, title: "Faith Collection", year: "2024", image: faithBeige },
  { id: 15, title: "Stranger Things Front", year: "2024", image: strangerThingsFront },
  { id: 16, title: "Karan Aujla Hoodie Back", year: "2024", image: karanAujlaBack },
  { id: 17, title: "Karan Aujla Hoodie Front", year: "2024", image: karanAujlaFront },
  { id: 18, title: "Believe in Luke", year: "2024", image: believeInLuke },
  { id: 19, title: "Alien Blues", year: "2024", image: alienBlues },
  { id: 20, title: "WWYN Collection", year: "2024", image: wwyn },
];

const Apparel = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".project-item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Apparel Design | DAKENDEVIL</title>
        <meta name="description" content="DTF, screen print, and embroidery designs. Explore our apparel portfolio." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <div ref={heroRef} className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/#works" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm tracking-wider uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Works
            </Link>
            <h1 className="display-xl text-foreground mb-4">Apparel Design</h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl">
              DTF, screen print, and embroidery designs that make statements. Wearable art for bold brands.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="px-6 md:px-12 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-item group relative aspect-square overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] tracking-[0.3em] text-primary uppercase mb-1">{project.year}</p>
                  <h3 className="font-display text-xl text-foreground">{project.title}</h3>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Apparel;
