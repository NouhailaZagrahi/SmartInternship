import React from 'react';
import '../css/EntrepriseSection.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Loubna MOUNIR',
      profession: 'Profession',
      imgSrc: 'img/team.png',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
      delay: '0.2s',
    },
    {
      name: 'Nouhaila ZAGRAHI',
      profession: 'Profession',
      imgSrc: 'img/team.png',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
      delay: '0.4s',
    },
    {
      name: 'Sabrine ELBOUKILI',
      profession: 'Profession',
      imgSrc: 'img/team.png',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
      delay: '0.6s',
    },
  ];

  return (
    <div className="container-fluid team pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
          <h4 style={{ color: "#9b7cd4" }}>Our Team</h4>
          <h1 className="display-5 mb-4">Meet Our Members</h1>
          <p className="mb-0">
          The platform was developed by a team of three passionate young girls in their 4th year of Computer Engineering at ENSA Safi.
          Their combined expertise in software development and project management has allowed them to build a platform that meets the needs of users and provides a seamless experience.
          </p>
        </div>
        <div className="row g-4 justify-content-center service-card">
          {teamMembers.map((member, index) => (
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp " data-wow-delay={member.delay} key={index}>
              <div className="team-item">
                <div className="team-img">
                  <img src={member.imgSrc} className="img-fluid" alt={member.name} />
                </div>
                <div className="team-title">
                  <h4 className="mb-0">{member.name}</h4>
                  <p className="mb-0">{member.profession}</p>
                </div>
                <div className="team-icon d-flex justify-content-center">
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3 custom-btn" href={member.twitter}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3 custom-btn" href={member.linkedin}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-primary btn-sm-square rounded-circle me-3 custom-btn" href={member.github}>
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
