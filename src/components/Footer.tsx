const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="font-display text-lg tracking-wider text-foreground">
            DAKEN<span className="text-primary">DEVIL</span>
          </a>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            © {currentYear} DAKENDEVIL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
