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
  { id: 1, title: "Urban Collection", year: "2024", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" },
  { id: 2, title: "Streetwear Drop", year: "2024", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80" },
  { id: 3, title: "Limited Tee", year: "2023", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80" },
  { id: 4, title: "Embroidered Hoodie", year: "2024", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
  { id: 5, title: "DTF Collection", year: "2023", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80" },
  { id: 6, title: "Screen Print Series", year: "2024", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
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
