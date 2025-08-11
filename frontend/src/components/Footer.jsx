import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
      <div className="container py-5 border-start-0 border-end-0" style={{ border: '1px solid', borderColor: 'rgb(255, 255, 255, 0.08)' }}>
      <div className="row g-5">
  <div className="col-md-6 col-lg-6 col-xl-4">
    {/* Première colonne (à gauche) */}
    <div className="footer-item">
      <a href="/" className="p-0">
      <h2 className="text-white">
        <i className="fas fa-graduation-cap me-2"></i>SmartInternship
      </h2>


      </a>
      <p className="mb-4 text-white">
        Dolor amet sit justo amet elitr clita ipsum elitr est. Lorem ipsum dolor sit amet, consectetur adipiscing...
      </p>
    </div>
  </div>

  {/* Ces deux colonnes sont alignées à droite */}
  <div className="col-md-6 col-lg-6 col-xl-2 ms-auto">
    <div className="footer-item">
      <h4 className="text-white mb-4">Quick Links</h4>
      <a href="#"><i className="fas fa-angle-right me-2"></i> About Us</a>
      <a href="#"><i className="fas fa-angle-right me-2"></i> Feature</a>
      <a href="#"><i className="fas fa-angle-right me-2"></i> Blog</a>
      <a href="#"><i className="fas fa-angle-right me-2"></i> Contact us</a>
    </div>
  </div>

  <div className="col-md-6 col-lg-6 col-xl-3">
    <div className="footer-item">
      <h4 className="text-white mb-4">Contact Info</h4>
      <div className="d-flex align-items-center">
        <i className="fas fa-map-marker-alt text-#9b7cd4 me-3"></i>
        <p className="text-white mb-0">123 Street New York.USA</p>
      </div>
      <div className="d-flex align-items-center">
        <i className="fas fa-envelope text-#9b7cd4 me-3"></i>
        <p className="text-white mb-0">info@example.com</p>
      </div>
      <div className="d-flex align-items-center">
        <i className="fa fa-phone-alt text-#9b7cd4 me-3"></i>
        <p className="text-white mb-0">(+012) 3456 7890</p>
      </div>
      <div className="d-flex align-items-center mb-4">
        <i className="fab fa-firefox-browser text-#9b7cd4 me-3"></i>
        <p className="text-white mb-0">Yoursite@ex.com</p>
      </div>
      <div className="d-flex">
        <a className="btn btn-purple btn-sm-square rounded-circle me-3" href="#">
          <i className="fab fa-facebook-f text-white"></i>
        </a>
        <a className="btn btn-purple btn-sm-square rounded-circle me-3" href="#">
          <i className="fab fa-twitter text-white"></i>
        </a>
        <a className="btn btn-purple btn-sm-square rounded-circle me-3" href="#">
          <i className="fab fa-instagram text-white"></i>
        </a>
        <a className="btn btn-purple btn-sm-square rounded-circle me-0" href="#">
          <i className="fab fa-linkedin-in text-white"></i>
        </a>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Footer;
