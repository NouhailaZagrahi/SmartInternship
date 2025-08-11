import React from "react";
import { FaGraduationCap, FaSearch, FaFileAlt, FaComments } from "react-icons/fa";
import '../css/EntrepriseSection.css'; 

const StudentSection = () => {
  const services = [
    {
      icon: <FaGraduationCap size={30} />,
      title: "Access Internship Offers",
      description:
        "Browse and apply for internship opportunities posted by companies in your field of interest.",
    },
    {
      icon: <FaSearch size={30} />,
      title: "Find Relevant Offers",
      description:
        "Use filters to find the best internship opportunities based on your skills and preferences.",
    },
    {
      icon: <FaFileAlt size={30} />,
      title: "Create a Professional CV",
      description:
        "Build and update your CV easily to apply for internships and other opportunities.",
    },
    {
      icon: <FaComments size={30} />,
      title: "Connect with Companies",
      description:
        "Communicate with companies, schedule interviews, and ask questions about the internships.",
    },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container">
        <h2
          className="text-center mb-5"
          style={{ color: "#9b7cd4", fontWeight: "bold" }}
        >
          Our Services for Students
        </h2>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3 mb-4" key={index}>
              <div className="service-card text-center p-4 h-100">
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

export default StudentSection;
