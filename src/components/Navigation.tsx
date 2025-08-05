import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on mount
    gsap.from(".nav-container", {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: "power3.out",
      delay: 3.5 // After preloader
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Open animation
      gsap.to(".mobile-menu", {
        duration: 0.5,
        x: 0,
        ease: "power3.out"
      });
      gsap.from(".mobile-menu-item", {
        duration: 0.6,
        x: 50,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out"
      });
    } else {
      // Close animation
      gsap.to(".mobile-menu", {
        duration: 0.3,
        x: "100%",
        ease: "power3.in"
      });
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-xl' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/"
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={scrollToTop}
            >
              Abhishek
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-foreground/80 hover:text-primary transition-colors duration-300 relative group ${
                    location.pathname === item.path ? 'text-primary' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 ml-8">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                >
                  <GithubLogo size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-secondary transition-colors duration-300 hover:scale-110 transform"
                >
                  <LinkedinLogo size={20} />
                </a>
              </div>

              {/* Hire Me Button */}
              <button className="btn-hero px-6 py-2 rounded-full text-white font-medium">
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground p-2 hover:text-primary transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-80 glass backdrop-blur-xl z-40 transform translate-x-full md:hidden`}>
        <div className="flex flex-col h-full pt-20 px-8">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className={`mobile-menu-item text-left py-4 text-xl text-foreground/80 hover:text-primary transition-colors duration-300 border-b border-border/20 ${
                location.pathname === item.path ? 'text-primary' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Social Links */}
          <div className="mobile-menu-item flex items-center space-x-6 mt-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors duration-300"
            >
              <GithubLogo size={24} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-secondary transition-colors duration-300"
            >
              <LinkedinLogo size={24} />
            </a>
          </div>

          {/* Mobile Hire Me Button */}
          <button className="mobile-menu-item btn-hero px-6 py-3 rounded-full text-white font-medium mt-8 self-start">
            Hire Me
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;