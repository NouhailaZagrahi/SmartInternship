import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isServicesActive =
    location.pathname.startsWith("/entrepriseServices") ||
    location.pathname.startsWith("/studentServices");

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <a href="#" className="navbar-brand p-0">
          <h2 style={{ color: "#9b7cd4", fontWeight: "bold" }}>
          <i className="fas fa-graduation-cap me-2"></i>SmartInternship
          </h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-item nav-link" + (isActive ? " active" : "")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                "nav-item nav-link" + (isActive ? " active" : "")
              }
            >
              About
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                "nav-item nav-link" + (isActive ? " active" : "")
              }
            >
              Blogs
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className={
                  "nav-link dropdown-toggle" +
                  (isServicesActive ? " active" : "")
                }
                role="button"
                data-bs-toggle="dropdown"
              >
                Services
              </a>
              <div className="dropdown-menu m-0">
                <Link to="/entrepriseServices" className="dropdown-item">
                  For Entreprise
                </Link>
                <Link to="/studentServices" className="dropdown-item">
                  For Student
                </Link>
              </div>
            </div>
            <NavLink
              to="/Contactus"
              className={({ isActive }) =>
                "nav-item nav-link" + (isActive ? " active" : "")
              }
            >
              Contact us
            </NavLink>
          </div>
          <div className="nav-item dropdown">
  <button
    className="btn rounded-pill py-2 px-4 my-3 my-lg-0 flex-shrink-0 me-3"
    style={{ backgroundColor: "purple", color: "white", border: "none" }}
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Sign up
  </button>
  <div className="dropdown-menu dropdown-menu-end">
    <Link to="/Esign" className="dropdown-item">as Entreprise</Link>
    <Link to="/Ssign" className="dropdown-item">as Student</Link>
  </div>

  <button
    className="btn rounded-pill py-2 px-4 my-3 my-lg-0 flex-shrink-0"
    style={{ backgroundColor: "purple", color: "white", border: "none" }}
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Log in
  </button>
</div>


        </div>
      </nav>
    </div>
  );
};

export default Navbar;
