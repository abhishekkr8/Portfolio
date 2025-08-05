import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { GithubLogo, LinkedinLogo, TwitterLogo, EnvelopeSimple, Phone, MapPin } from 'phosphor-react';
import { useToast } from '@/hooks/use-toast';

// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    EmailJS_EMAIL_SERVICE_ID: string;
    EmailJS_EMAIL_TEMPLATE_ID: string;
    EmailJS_EMAIL_PUBLIC_KEY: string;
  }
}


const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const EMAIL_SERVICE_ID = import.meta.env.VITE_EmailJS_EMAIL_SERVICE_ID;
  const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EmailJS_EMAIL_TEMPLATE_ID;
  const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EmailJS_EMAIL_PUBLIC_KEY;


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Section title animation
    tl.from(".contact-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    })

      // Form animation
      .from(".contact-form", {
        duration: 1,
        x: -100,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.5")

      // Contact info animation
      .from(".contact-info", {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.8")

      // Form fields animation
      .from(".form-field", {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5")

    // Social icons animation
    // .from(".social-icon", {
    //   duration: 0.5,
    //   scale: 0,
    //   opacity: 0,
    //   stagger: 0.1,
    //   ease: "back.out(1.7)"
    // }, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAIL_PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_name: "Abhishek", // Your name
        },
        EMAIL_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      // Success animation
      gsap.to(".submit-btn", {
        duration: 0.3,
        scale: 1.05,
        ease: "back.out(1.7)"
      });

      setTimeout(() => {
        gsap.to(".submit-btn", {
          duration: 0.3,
          scale: 1,
          ease: "back.out(1.7)"
        });
      }, 300);

      // Show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);

      // Show error message
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <EnvelopeSimple size={24} />,
      label: 'Email',
      value: 'abhishekkr8709@gmail.com',
      link: 'abhishekkr8709@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 8709606133',
      link: 'tel:+918709606133'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Delhi, India',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <GithubLogo size={24} />,
      label: 'GitHub',
      link: 'https://github.com/abhishekkr8',
      color: 'hover:text-foreground'
    },
    {
      icon: <LinkedinLogo size={24} />,
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/abhishekkr8709',
      color: 'hover:text-secondary'
    },
    {
      icon: <TwitterLogo size={24} />,
      label: 'Twitter',
      link: 'https://x.com/singhsahab0806',
      color: 'hover:text-accent'
    }
  ];

  return (
    <section id="contact" ref={contactRef} className="pt-16 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 rounded-full bg-secondary animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-1/3 w-2.5 h-2.5 rounded-full bg-primary animate-pulse delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-heading gradient-text mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label htmlFor="from_name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="from_email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full btn-hero py-4 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info space-y-8">
            {/* Contact Details */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:glass transition-all duration-300 group"
                  >
                    <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Follow Me</h3>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon p-3 glass rounded-lg text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:glow-primary`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                <div>
                  <p className="text-foreground font-medium">Available for new projects</p>
                  <p className="text-sm text-muted-foreground">Usually responds within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;