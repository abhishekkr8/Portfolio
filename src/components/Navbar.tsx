import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Abhishek
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium bg-primary text-primary-foreground rounded-md mt-4 text-center"
              >
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;