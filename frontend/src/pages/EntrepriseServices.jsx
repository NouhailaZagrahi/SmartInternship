import React from "react";
import Navbar from "../components/Navbar";
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer'; 
import EntrepriseSection from '../components/EntrepriseSection'; 

import aboutBg from '/img/company.jpg';




const EntrepriseServices = () => {
  return ( 
    <>
      <Navbar />
      <PageHeader
        title="Entreprise Services"
        current="Services"
        backgroundImage={aboutBg}
      />
      <EntrepriseSection />
      <Footer />
    </>
  );
};

export default EntrepriseServices;
