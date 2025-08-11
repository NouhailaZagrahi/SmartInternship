import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from '../components/PageHeader';
import BlogSlider from '../components/BlogSlider';
import Footer from '../components/Footer'; 

import aboutBg from '/img/homepic1.jpg'; 




const Blogs = () => {
  return ( 
    <>
      <Navbar />
      <PageHeader
        title="Our Blogs"
        current="Blogs"
        backgroundImage={aboutBg}
      />
      <BlogSlider />
      <Footer />
    </>
  );
};

export default Blogs;
