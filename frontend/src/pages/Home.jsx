import React from 'react';
import Topbar from '../components/Topbar';
import Navbar from "../components/Navbar";
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import BlogSlider from "../components/BlogSlider";
import FAQ from '../components/FAQ'; 
import Team from '../components/Team'; 
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer'; 




const Home = () => {
  return (
    <>
      {/*<Topbar />*/}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />*
      <BlogSlider />
      <FAQ />
      <Team />
      <Testimonial />
      <Footer />

    </>
  );
};

export default Home;
