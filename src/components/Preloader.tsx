import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // Animate logo appearance
    tl.from(".preloader-logo", {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)"
    }, 0);

    // Animate text
    tl.from(".preloader-text", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out"
    }, 0.5);

    // Completion sequence
    tl.call(() => {
      setTimeout(() => {
        gsap.to(".preloader", {
          duration: 1,
          opacity: 0,
          scale: 0.9,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }, 500);
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-xl floating"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-xl floating-delayed"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-accent/20 blur-xl floating"></div>
      
      <div className="relative text-center">
        {/* Logo/Name */}
        <div className="preloader-logo mb-8">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text">
            Abhishek
          </h1>
          <div className="w-full h-px bg-gradient-primary mt-4 opacity-50"></div>
        </div>
        
        {/* Loading text */}
        <div className="preloader-text mb-8">
          <p className="text-muted-foreground text-lg">Crafting Digital Experiences</p>
        </div>
        
        {/* Progress bar container */}
        <div className="relative w-80 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="progress-bar absolute top-0 left-0 h-full bg-gradient-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress percentage */}
        <div className="mt-4 text-2xl font-mono text-primary">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;