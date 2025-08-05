import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart } from 'phosphor-react';
import { HashLink } from 'react-router-hash-link';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Footer animation
    gsap.from(".footer-content", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 60,
      opacity: 0,
      ease: "power2.out"
    });

    // Floating particles animation
    gsap.to(".footer-particle", {
      duration: 3,
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: <GithubLogo size={20} />,
      link: 'https://github.com/abhishekkr8',
      label: 'GitHub'
    },
    {
      icon: <LinkedinLogo size={20} />,
      link: 'https://linkedin.com/in/abhishekkr8709',
      label: 'LinkedIn'
    },
    {
      icon: <TwitterLogo size={20} />,
      link: 'https://x.com/singhsahab0806',
      label: 'Twitter'
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-glass/10 to-transparent"></div>
      
      {/* Floating Particles */}
      <div className="footer-particle absolute top-10 left-10 w-2 h-2 rounded-full bg-primary/30 blur-sm"></div>
      <div className="footer-particle absolute top-16 right-20 w-1 h-1 rounded-full bg-secondary/40 blur-sm"></div>
      <div className="footer-particle absolute bottom-16 left-1/4 w-1.5 h-1.5 rounded-full bg-accent/30 blur-sm"></div>
      <div className="footer-particle absolute bottom-20 right-1/3 w-2.5 h-2.5 rounded-full bg-primary/20 blur-sm"></div>
      <div className="footer-particle absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-secondary/30 blur-sm"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <button 
                onClick={scrollToTop}
                className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                Abhishek
              </button>
              <p className="text-muted-foreground mt-2 text-sm">
                Full-Stack Developer crafting digital experiences with modern technologies.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
  <HashLink
    key={link.name}
    to={`/#${link.id}`}
    smooth
    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
  >
    {link.name}
  </HashLink>
))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass rounded-lg text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300 hover:scale-110"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>© 2024 Abhishek. Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>and lots of caffeine</span>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 glass px-4 py-2 rounded-full hover:glow-primary"
              >
                Back to Top ↑
              </button>
            </div>
          </div>

          {/* Tech Stack Credit */}
          <div className="text-center mt-6 pt-6 border-t border-border/10">
            <p className="text-xs text-muted-foreground/60">
              Built with React, GSAP & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;