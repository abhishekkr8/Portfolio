import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile.jpg';
import { Link } from 'react-router-dom';


const scrollToAbout = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Tech stack icons (you can replace with actual icons)
const techStack = [
  { name: 'HTML5', icon: '⚡' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'GSAP', icon: '🚀' },
  { name: 'MongoDB', icon: '🍃' }
];

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Section title animation
    tl.from(".about-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    })

      // Profile image animation
      .from(".profile-image", {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.5")

      // Content animation
      .from(".about-content", {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.8")

      // Tech stack animation
      .from(".tech-icon", {
        duration: 0.6,
        y: 30,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5");

    // Profile image hover effect
    if (imageRef.current) {
      const imageElement = imageRef.current;

      imageElement.addEventListener('mouseenter', () => {
        gsap.to(imageElement, {
          duration: 0.3,
          scale: 1.05,
          rotationY: 5,
          ease: "power2.out"
        });
      });

      imageElement.addEventListener('mouseleave', () => {
        gsap.to(imageElement, {
          duration: 0.3,
          scale: 1,
          rotationY: 0,
          ease: "power2.out"
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={aboutRef} className="pt-16 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-secondary/10 blur-xl floating"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-accent/10 blur-xl floating-delayed"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="about-title text-heading gradient-text mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div
              ref={imageRef}
              className="profile-image relative"
            >
              <div className="relative w-80 h-80 rounded-full glass p-4 glow-primary">
                <img
                  src={profileImage}
                  alt="Abhishek - Web Developer"
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow"></div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="about-content">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Full-Stack Developer
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Abhishek, a fresher full-stack web developer with a strong foundation in building responsive, modern, and user-friendly web applications.
              </p>

              <p>
                I specialize in the MERN stack and love turning ideas into functional digital products using technologies like JavaScipt, Nodejs, Express, React and GSAP. My focus is on creating clean UI, smooth user experiences, and scalable solutions.
              </p>

              <p>
                Driven by curiosity and a growth mindset, I enjoy learning new technologies, solving real-world problems, and contributing to the developer community.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-6 text-foreground">Tech Stack</h4>
              <div className="grid grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-icon group"
                  >
                    <div className="glass p-4 rounded-lg text-center hover:glow-primary transition-all duration-300 card-hover cursor-pointer">
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {tech.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button className="btn-hero px-6 py-3 rounded-full text-white font-medium"
              >
                <Link to="/contact" >Let's Work Together </Link>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;