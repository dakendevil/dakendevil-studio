const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[600px] bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="display-lg text-foreground mb-8">About</h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="text-xl md:text-2xl text-muted-foreground font-body font-light leading-relaxed">
              DakenDevil is a visual design studio crafting bold identities, 
              apparel, and visuals that leave{" "}
              <span className="text-foreground">lasting impact</span>.
            </p>
            <p className="mt-6 text-muted-foreground font-body font-light">
              Based on precision, intention, and a refusal to be ordinary.
            </p>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square relative">
              {/* Decorative Frame */}
              <div className="absolute inset-8 border border-border" />
              <div className="absolute inset-12 border border-primary/30" />
              
              {/* Center Logo Mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="display-md text-primary">DD</span>
                  <div className="mt-2 w-8 h-px bg-primary mx-auto" />
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-primary" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-primary" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-primary" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
