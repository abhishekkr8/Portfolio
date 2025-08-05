import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowSquareOut, GithubLogo } from 'phosphor-react';

// Import project images
import project1 from '../assets/project-1.png';
import project2 from '../assets/project-2.png';
import project3 from '../assets/project-3.png';
import project4 from '../assets/project-4.png';
import project5 from '../assets/project-5.png';
import project6 from '../assets/project-6.png';

const projects = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'Full-stack e-commerce platform with user authentication and payment integration',
    image: project1,
    tech: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://ecommerce-75.vercel.app/',
    github: 'https://github.com/abhishekkr8/Ecommerce.git'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects and skills with smooth animations',
    image: project2,
    tech: ['React', 'GSAP', 'Tailwind CSS'],
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Wanderlust Hotel Booking',
    description: 'It allows users to explore hotels, leave reviews, and manage their own listings all with secure authentication and user validation.',
    image: project3,
    tech: ['Node.js', 'Express', 'EJS', 'MongoDB'],
    link: 'https://project-p232.onrender.com/listings',
    github: 'https://github.com/abhishekkr8/Wonderluster.git'
  },
  {
    id: 4,
    title: 'QuickRide App',
    description: 'A mobile-first ride-booking platform with real-time chat, live location tracking, smart fare calculation, and seamless booking. Built with modern web & mobile tech, it blends clean UI with real-time features—perfect for showcasing full-stack skills.',
    image: project4,
    tech: ['React', 'Redux', 'Node.js', 'Express', 'Socket.IO'],
    link: 'https://uber-nine-rho.vercel.app/',
    github: 'https://github.com/abhishekkr8/QuickRide.git'
  },
  {
    id: 5,
    title: 'Spotify Frontend Clone',
    description: 'A static UI replica of Spotify built using only HTML and CSS. Features a clean, responsive layout that mimics Spotify’s modern design—perfect for showcasing frontend styling skills.',
    image: project5,
    tech: ['HTML', 'CSS'],
    link: 'https://frontend-project-beige-psi.vercel.app/',
    github: 'https://github.com/abhishekkr8/FrontendProject.git'
  },
  {
    id: 6,
    title: 'Portfolio',
    description: 'A personal portfolio website that showcases my skills, projects, and experience with a focus on clean design and smooth animations.',
    image: project6,
    tech: ['HTML', 'CSS', 'JavaScript', 'animations'],
    link: 'https://frontend-project-4bls.vercel.app/',
    github: 'https://github.com/abhishekkr8/FrontendProject.git'
  }
];


const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section title animation
    gsap.from(".projects-title", {
      scrollTrigger: {
        trigger: ".projects-title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    });

    // Project cards animation
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 100,
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Horizontal scroll for mobile
    if (scrollRef.current && window.innerWidth < 768) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = scrollRef.current.offsetWidth;

      gsap.to(scrollRef.current, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 50%",
          end: `+=${scrollWidth - containerWidth}`,
          scrub: 1,
          pin: true
        },
        x: -(scrollWidth - containerWidth),
        ease: "none"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="pt-16 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-1/4 w-24 h-24 rounded-full bg-primary/10 blur-xl floating"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full bg-secondary/10 blur-xl floating-delayed"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-heading gradient-text mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web applications and innovative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={scrollRef}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 overflow-x-auto md:overflow-visible"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group min-w-[300px] md:min-w-0"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Overlay Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full glass hover:glow-primary transition-all duration-300"
                    >
                      <ArrowSquareOut size={20} className="text-white" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full glass hover:glow-secondary transition-all duration-300"
                    >
                      <GithubLogo size={20} className="text-white" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className={`text-muted-foreground mb-2 ${!expandedDescriptions[project.id] ? 'line-clamp-2' : ''}`}>
                    {project.description}
                  </p>

                  {/* Show More / Show Less Button */}
                  {project.description.length > 80 && (
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-primary text-sm hover:underline mb-3"
                    >
                      {expandedDescriptions[project.id] ? 'Show Less' : 'Show More'}
                    </button>
                  )}


                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full glass text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 btn-hero rounded-lg text-white text-sm font-medium"
                    >
                      View Live
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      <GithubLogo size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;