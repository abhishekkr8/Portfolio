import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'phosphor-react';


const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 }); // After preloader

    // Hero content animations
    tl.from(".hero-title", {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    })
      .from(".hero-subtitle", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5")
      .from(".hero-cta", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .from(".scroll-indicator", {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.2");

    // Spline 3D animation
    if (splineRef.current) {
      gsap.from(splineRef.current, {
        duration: 1.5,
        x: 200,
        opacity: 0,
        ease: "power3.out",
        delay: 4.5
      });
    }

    // Floating orbs animation
    gsap.to(".floating-orb", {
      duration: 4,
      y: -30,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark"></div>

      {/* Floating Orbs */}
      <div className="floating-orb absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-xl"></div>
      <div className="floating-orb absolute top-40 right-20 w-24 h-24 rounded-full bg-secondary/20 blur-xl"></div>
      <div className="floating-orb absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-accent/20 blur-xl"></div>
      <div className="floating-orb absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-primary/15 blur-xl"></div>

      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute right-0 top-0 w-full h-full lg:w-2/3">
        <iframe
          src='https://my.spline.design/orb-otwAZZUoAflBauErRpTm9g4z/'
          frameBorder='0'
          width='100%'
          height='100%'
          className="opacity-60 lg:opacity-80"
        ></iframe>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Main Headline */}
          <h1 className="hero-title text-hero font-bold mb-6">
            Hi, I'm{' '}
            <span className="gradient-text">Abhishek</span>
            <br />
            Web Developer
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-subheading text-muted-foreground mb-8 max-w-2xl">
            Full-stack MERN developer building fast, responsive, and scalable web applications with a focus on clean UI, user experience, and modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToAbout}
              className="btn-hero px-8 py-4 rounded-full text-white font-medium text-lg"
            >
              View My Work
            </button>
            {/* <button className="px-8 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium text-lg">
              Download CV
            </button> */}
            <a
              href="../../public/Resume.pdf"
              download
              className="px-8 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium text-lg text-center"
            >
              Download CV
            </a>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <div className="scroll-indicator"></div>
        <p className="text-sm text-muted-foreground mt-2">Scroll Down</p>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;