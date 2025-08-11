import React from 'react';
import '../css/PageHeader.css';
import { Link } from "react-router-dom";

const PageHeader = ({ title, current, backgroundImage }) => {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="hero-section" style={sectionStyle}>
      <div className="container">
        <h4
          className="text-white display-4 mb-4 wow fadeInDown"
          data-wow-delay="0.1s"
        >
          {title}
        </h4>
        <ol
          className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
          data-wow-delay="0.3s"
        >
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
          </li>
          <li
            className="breadcrumb-item active"
            style={{ color: "#9b7cd4", fontWeight: "bold" }}
          >
            {current}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PageHeader;
