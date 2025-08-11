import React from 'react';
import '../css/features.css'; 

const FeaturesSection = () => {
  const features = [
    {
      icon: 'bi bi-search',
      title: 'Smart Matching',
      description: 'Find the most suitable internship offers based on your skills, interests, and career goals.',
      delay: '0.2s'
    },
    {
      icon: 'bi bi-tools',
      title: 'Application Tools',
      description: 'Prepare your CVs, cover letters, and interviews with intelligent, guided tools.',
      delay: '0.4s'
    },
    {
      icon: 'bi bi-bar-chart-line',
      title: 'Progress Tracking',
      description: 'Track your internship applications and monitor responses in real-time.',
      delay: '0.6s'
    },
    {
      icon: 'bi bi-chat-dots',
      title: 'Direct Communication',
      description: 'Connect with companies and recruiters through integrated chat and support.',
      delay: '0.8s'
    }
  ];

  return (
    <div className="container-fluid feature pb-5">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: '800px' }}
        >
          <h4 className="text-purple">Key Features</h4>
          <h1 className="display-5 mb-4">Empowering Students with the Right Internship Tools</h1>
          <p className="mb-0 text-muted">
            Our intelligent platform connects you with the right companies and provides the tools you need to succeed.
          </p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay={feature.delay}
              key={index}
            >
              <div className="feature-item p-4 border rounded shadow-sm h-100 bg-white text-center">
                <div className="feature-icon p-4 mb-4 bg-purple-light rounded-circle d-inline-flex align-items-center justify-content-center">
                  <i className={`${feature.icon} fa-2x text-purple`}></i>
                </div>
                <h5 className="mb-3">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
                <a className="btn btn-purple rounded-pill py-2 px-4" href="#">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
