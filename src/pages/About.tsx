import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;