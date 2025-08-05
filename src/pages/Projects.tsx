import React from 'react';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage;