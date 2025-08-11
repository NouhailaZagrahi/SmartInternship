import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from '../components/PageHeader';
import StudentSection from '../components/StudentSection'; 
import Footer from '../components/Footer'; 

import aboutBg from '/img/students.jpg';



const StudentServices = () => {
  return ( 
    <>
      <Navbar />
      <PageHeader
        title="Student Services"
        current="Services"
        backgroundImage={aboutBg}
      />
      <StudentSection />
      <Footer />
    </>
  );
};

export default StudentServices;
