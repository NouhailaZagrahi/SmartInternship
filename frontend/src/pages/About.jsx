import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer'; 

import aboutBg from '/img/homepic1.jpg'; // ou '/img/about.jpg' si statique




const About = () => {
  return ( 
    <>
      <Navbar />
      <PageHeader
        title="About Us"
        current="About"
        backgroundImage={aboutBg}
      />
      <AboutSection />
      <Footer />
    </>
  );
};

export default About;
