import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_ysq7ana";
const EMAILJS_TEMPLATE_ID = "template_nmo8x3g";
const EMAILJS_PUBLIC_KEY = "57CN0X506N1rw6RNL";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          whatsapp_number: formData.whatsapp,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", whatsapp: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: Mail, href: "mailto:hello@dakendevil.com", label: "Email" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column */}
          <div ref={leftRef}>
            <h2 className="display-lg text-foreground mb-4">Let's Work</h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="text-muted-foreground font-body font-light mb-12 max-w-md">
              Ready to create something extraordinary? Get in touch and let's 
              bring your vision to life.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/5"
                  aria-label={social.label}
                >
                  <social.icon 
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" 
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-14 px-4 font-body"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-14 px-4 font-body"
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="WhatsApp Number (Optional)"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-14 px-4 font-body"
              />
            </div>
            <div>
              <Textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[150px] p-4 font-body resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg tracking-[0.2em] transition-all duration-300 hover:tracking-[0.3em] disabled:opacity-50"
            >
              {isSubmitting ? "SENDING..." : "LET'S WORK"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
