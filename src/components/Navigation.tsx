import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Works", href: "#works", isHash: true },
  { label: "Services", href: "#services", isHash: true },
  { label: "About", href: "#about", isHash: true },
  { label: "Contact", href: "#contact", isHash: true },
];

const servicePages = [
  { label: "Logo Design", href: "/logo-design" },
  { label: "Apparel", href: "/apparel" },
  { label: "Mockups", href: "/mockups" },
  { label: "Posters", href: "/posters" },
  { label: "Banners", href: "/banners" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isHash: boolean) => {
    if (isHash && location.pathname !== "/") {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="font-display text-xl tracking-wider text-foreground">
              DAKEN<span className="text-primary">DEVIL</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.isHash && location.pathname === "/" ? item.href : `/${item.href}`}
                  onClick={() => handleNavClick(item.href, item.isHash)}
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body link-underline"
                >
                  {item.label}
                </a>
              ))}
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <button className="flex items-center gap-1 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body">
                  Portfolio
                  <ChevronDown className={`w-3 h-3 transition-transform ${showServices ? "rotate-180" : ""}`} />
                </button>
                
                <div className={`absolute top-full left-0 mt-2 w-48 bg-card border border-border transition-all duration-300 ${
                  showServices ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}>
                  {servicePages.map((page) => (
                    <Link
                      key={page.href}
                      to={page.href}
                      className="block px-4 py-3 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.isHash && location.pathname === "/" ? item.href : `/${item.href}`}
              onClick={() => {
                handleNavClick(item.href, item.isHash);
                setIsOpen(false);
              }}
              className={`font-display text-3xl text-foreground tracking-wider transition-all duration-500 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Service Pages */}
          <div className="w-px h-8 bg-border" />
          {servicePages.map((page, index) => (
            <Link
              key={page.href}
              to={page.href}
              onClick={() => setIsOpen(false)}
              className={`font-display text-xl text-muted-foreground hover:text-foreground tracking-wider transition-all duration-500 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${(navItems.length + index) * 100}ms` }}
            >
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
