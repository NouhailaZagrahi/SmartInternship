import React from 'react';
import '../css/HeroSection.css';

const ChoiceSection = () => {
  const backgroundStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/sign.jpg') center/cover no-repeat`
  };

  return (
    <div
      className="hero-section d-flex align-items-center"
      style={backgroundStyle}
    >
      <div className="container">
        <h1
          className="text-white display-4 mb-4 wow fadeInDown"
          data-wow-delay="0.1s"
        >
          You want to Sign up as a : 
        </h1>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <a href="#" className="btn btn-outline-custom rounded-pill px-4 py-2">
            Entreprise
          </a>
          <a href="#" className="btn btn-outline-custom rounded-pill px-4 py-2">
            Student
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChoiceSection;
