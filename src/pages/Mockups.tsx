import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "Product Showcase", year: "2024", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80" },
  { id: 2, title: "Brand Presentation", year: "2024", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" },
  { id: 3, title: "Device Mockup", year: "2023", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" },
  { id: 4, title: "Packaging Design", year: "2024", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80" },
  { id: 5, title: "Stationery Set", year: "2023", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b8a?w=800&q=80" },
  { id: 6, title: "Scene Builder", year: "2024", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80" },
];

const Mockups = () => {
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
        <title>Mockups | DAKENDEVIL</title>
        <meta name="description" content="Photorealistic product visualization mockups. Explore our mockup portfolio." />
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
            <h1 className="display-xl text-foreground mb-4">Mockups</h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl">
              Photorealistic product visualization that brings designs to life before production.
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

export default Mockups;
