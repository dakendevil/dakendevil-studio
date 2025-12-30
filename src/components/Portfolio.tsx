import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
}

const projects: Project[] = [
  { id: 1, title: "Noir Identity", category: "logo", year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", size: "large", link: "/logo-design" },
  { id: 2, title: "Urban Collection", category: "apparel", year: "2024", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80", size: "medium", link: "/apparel" },
  { id: 3, title: "Minimal Brand", category: "logo", year: "2023", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", size: "small", link: "/logo-design" },
  { id: 4, title: "Festival Poster", category: "poster", year: "2024", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80", size: "medium", link: "/posters" },
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
      // Header animation with mask reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Grid items cinematic stagger
      gsap.fromTo(
        ".portfolio-item",
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          rotateX: 10,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate filter change
  useEffect(() => {
    gsap.fromTo(
      ".portfolio-item",
      { opacity: 0, scale: 0.85, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 0.5, 
        stagger: 0.08, 
        ease: "power2.out" 
      }
    );
  }, [activeFilter]);

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    if (hoveredId !== id) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} id="works" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-20">
        <div className="flex items-end gap-6 mb-8">
          <h2 className="display-lg text-foreground">Selected Works</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent mb-4" />
        </div>
        
        {/* Filters with enhanced styling */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`relative px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-body transition-all duration-500 border overflow-hidden group ${
                activeFilter === cat.value
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Hover glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid with perspective */}
      <div 
        ref={gridRef} 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ perspective: "2000px" }}
      >
        {filteredProjects.map((project) => (
          <Link
            to={project.link}
            key={project.id}
            className={`portfolio-item relative overflow-hidden cursor-pointer group ${
              project.size === "large" ? "md:col-span-2 md:row-span-2" : ""
            } ${project.size === "medium" ? "md:row-span-2" : ""}`}
            style={{ 
              minHeight: project.size === "large" ? "500px" : project.size === "medium" ? "400px" : "280px",
              transformStyle: "preserve-3d"
            }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={(e) => {
              setHoveredId(null);
              handleMouseLeave(e);
            }}
            onMouseMove={(e) => handleMouseMove(e, project.id)}
          >
            {/* Image with parallax zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out-expo group-hover:scale-110"
              />
              {/* Gradient mask on hover */}
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-600 ${
                hoveredId === project.id ? "opacity-95" : "opacity-0"
              }`} />
            </div>

            {/* Shine effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-opacity duration-500 ${
              hoveredId === project.id ? "opacity-100" : "opacity-0"
            }`} />

            {/* Crimson Accent Line with glow */}
            <div className={`absolute bottom-0 left-0 h-1 transition-all duration-600 ease-out-expo ${
              hoveredId === project.id ? "w-full" : "w-0"
            }`}>
              <div className="w-full h-full bg-primary" />
              <div className="absolute inset-0 bg-primary blur-sm" />
            </div>

            {/* Border frame on hover */}
            <div className={`absolute inset-4 border transition-all duration-500 ${
              hoveredId === project.id ? "border-primary/30 opacity-100" : "border-transparent opacity-0"
            }`} />

            {/* Content with staggered reveal */}
            <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${
              hoveredId === project.id ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}>
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase mb-3 font-body">
                {project.category} — {project.year}
              </p>
              <h3 className="display-md text-foreground">{project.title}</h3>
            </div>

            {/* View Indicator with glass effect */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ${
              hoveredId === project.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}>
              <span className="text-xs tracking-[0.3em] text-foreground uppercase font-body px-8 py-4 border border-foreground/20 backdrop-blur-md bg-background/20 block">
                View
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Links with hover effects */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-wrap justify-center gap-4">
        {categories.filter(c => c.value !== "all").map((cat) => (
          <Link
            key={cat.value}
            to={cat.link}
            className="group relative px-8 py-4 text-xs tracking-[0.2em] uppercase font-body border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-500 overflow-hidden"
          >
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <span className="relative z-10">View All {cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
