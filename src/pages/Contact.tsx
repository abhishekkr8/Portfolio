import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;