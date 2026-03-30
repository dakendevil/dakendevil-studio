import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chosenVessel from "@/assets/apparel/chosen-vessel.png";
import flexAndVibe from "@/assets/logos/flex-and-vibe.jpeg";
import posterPromise from "@/assets/posters/poster-promise.png";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "logo" | "apparel" | "mockup" | "poster" | "banner";

interface Project {
  id: number;
  title: string;
  category: Category;
  year: string;
  image: string;
  size: "large" | "medium" | "small";
  link: string;
  aspectRatio?: string;
}

const projects: Project[] = [
  { id: 1, title: "Flex And Vibe", category: "logo", year: "2024", image: flexAndVibe, size: "large", link: "/logo-design" },
  { id: 2, title: "Chosen Vessel", category: "apparel", year: "2024", image: chosenVessel, size: "small", link: "/apparel" },
  { id: 3, title: "Minimal Brand", category: "logo", year: "2023", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", size: "small", link: "/logo-design" },
  { id: 4, title: "Promise - Isaiah", category: "poster", year: "2024", image: posterPromise, size: "medium", link: "/posters" },
  { id: 5, title: "Product Showcase", category: "mockup", year: "2024", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80", size: "large", link: "/mockups" },
  { id: 6, title: "Event Banner", category: "banner", year: "2023", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80", size: "small", link: "/banners" },
];

const categories: { value: Category; label: string; link: string }[] = [
  { value: "all", label: "All Works", link: "" },
  { value: "logo", label: "Logo Design", link: "/logo-design" },
  { value: "apparel", label: "Apparel", link: "/apparel" },
  { value: "mockup", label: "Mockups", link: "/mockups" },
  { value: "poster", label: "Posters", link: "/posters" },
  { value: "banner", label: "Banners", link: "/banners" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".portfolio-item",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".portfolio-item",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="works" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <h2 className="display-lg text-foreground mb-8">Selected Works</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 text-xs tracking-[0.2em] uppercase font-body transition-all duration-300 border ${
                activeFilter === cat.value
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Link
            to={project.link}
            key={project.id}
            className={`portfolio-item relative overflow-hidden cursor-pointer group ${
              project.size === "large" ? "md:col-span-2 md:row-span-2" : ""
            } ${project.size === "medium" ? "md:row-span-2" : ""}`}
            style={{ 
              minHeight: project.size === "large" ? "500px" : project.size === "medium" ? "400px" : "250px",
              aspectRatio: project.aspectRatio || undefined,
            }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full transition-transform duration-700 ease-out-expo group-hover:scale-105 ${
                  project.aspectRatio ? "object-contain bg-background" : "object-cover"
                }`}
              />
            </div>

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-500 ${
              hoveredId === project.id ? "opacity-90" : "opacity-0"
            }`} />

            {/* Crimson Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ease-out-expo ${
              hoveredId === project.id ? "w-full" : "w-0"
            }`} />

            {/* Content */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
              hoveredId === project.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase mb-2 font-body">
                {project.category} — {project.year}
              </p>
              <h3 className="display-md text-foreground">{project.title}</h3>
            </div>

            {/* View Indicator */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              hoveredId === project.id ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}>
              <span className="text-xs tracking-[0.3em] text-foreground uppercase font-body px-6 py-3 border border-foreground/30 backdrop-blur-sm">
                View
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Links */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center gap-4">
        {categories.filter(c => c.value !== "all").map((cat) => (
          <Link
            key={cat.value}
            to={cat.link}
            className="px-6 py-3 text-xs tracking-[0.2em] uppercase font-body border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            View All {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
