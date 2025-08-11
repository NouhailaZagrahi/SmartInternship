import React from "react";
import { FaBriefcase, FaUsers, FaChartBar, FaComments } from "react-icons/fa";
import '../css/EntrepriseSection.css';

const EntrepriseSection = () => {
  const services = [
    {
      icon: <FaBriefcase size={30} />,
      title: "Post Internship Offers",
      description:
        "Easily publish your internship offers and reach hundreds of qualified students.",
    },
    {
      icon: <FaUsers size={30} />,
      title: "Access Student Profiles",
      description:
        "Explore detailed CVs and profiles to find the right candidates for your needs.",
    },
    {
      icon: <FaChartBar size={30} />,
      title: "Application Statistics",
      description:
        "View clear statistics on applications, popular fields, and student engagement.",
    },
    {
      icon: <FaComments size={30} />,
      title: "Simplified Communication",
      description:
        "Chat with students, schedule interviews, and exchange documents easily.",
    },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container">
        <h2
          className="text-center mb-5"
          style={{ color: "#9b7cd4", fontWeight: "bold" }}
        >
          Our Services for Companies
        </h2>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3 mb-4" key={index}>
              <div
                className="service-card text-center p-4 h-100"
              >
                <div
                  style={{
                    color: "#9b7cd4",
                    marginBottom: "15px",
                  }}
                >
                  {service.icon}
                </div>
                <h5 style={{ color: "#333", fontWeight: "bold" }}>
                  {service.title}
                </h5>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntrepriseSection;
