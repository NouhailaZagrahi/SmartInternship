import React from 'react';
import '../css/HeroSection.css';

const HeroSection = () => {
  const backgroundStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/homepic1.jpg') center/cover no-repeat`
  };

  return (
    <div
      className="hero-section d-flex align-items-center"
      style={backgroundStyle}
    >
      <div className="container">
        <h5>WELCOME TO SMARTINTERNSHIP</h5>
        <h1
          className="text-white display-4 mb-4 wow fadeInDown"
          data-wow-delay="0.1s"
        >
          FIND THE RIGHT INTERNSHIP
          TO KICKSTART YOUR CAREER
        </h1>
        <p className="lead">
          Discover personalized internship opportunities tailored to your skills and aspirations.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <a href="#" className="btn btn-outline-custom rounded-pill px-4 py-2">
            <i className="bi bi-play-circle-fill me-2"></i> Watch Demo
          </a>
          <a href="#" className="btn btn-primary-custom rounded-pill px-4 py-2">
            Get Started
          </a>
        </div>
        <div className="social-icons mt-4">
          <p className="mb-2">Follow Us:</p>
          <div className="d-flex justify-content-center gap-3 fs-4">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
