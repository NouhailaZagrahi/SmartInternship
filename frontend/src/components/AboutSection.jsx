import React from 'react';
import aboutImage from '/img/graduation.jpg'; // Image combinée
import '../css/about.css';

const AboutSection = () => {
  return (
    <div className="container-fluid about py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5">
      <div className="row g-5 align-items-stretch">
          <div className="col-xl-7">
            <div>
              <h2 className="text-purple">About Us</h2>
              <h1 className="display-5 mb-4">Your Gateway to Tailored Internships</h1>
              <p className="mb-4 text-muted">
                Our platform supports you at every step: from choosing the right opportunity to preparing for the interview, powered by intelligent matching technology.
              </p>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div><i className="bi bi-people-fill fa-3x text-purple"></i></div>
                    <div className="ms-4">
                      <h5>Intelligent Matching</h5>
                      <p className="text-muted">We connect students with the most relevant internship opportunities based on their profile.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div><i className="bi bi-lightning-fill fa-3x text-purple"></i></div>
                    <div className="ms-4">
                      <h5>Guidance</h5>
                      <p className="text-muted">Prepare your applications and interviews with intelligent tools.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 d-flex justify-content-end align-items-start">
          <img src={aboutImage} alt="About" className="img-fluid about-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
