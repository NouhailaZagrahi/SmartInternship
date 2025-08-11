import React from 'react';
import Slider from 'react-slick'; // Importer le composant Slider de react-slick

const Testimonial = () => {
  // Exemple de données pour les témoignages (les images et infos de chaque personne)
  const testimonials = [
    {
      id: 1,
      image: "img/testimonial-1.jpg",
      name: "Person Name 1",
      profession: "Profession 1",
      text: "This platform has greatly improved my ability to manage my assignments and track my progress effectively.",
    },
    {
      id: 2,
      image: "img/testimonial-2.jpg",
      name: "Person Name 2",
      profession: "Profession 2",
      text:   "This platform has greatly improved my ability to manage my assignments and track my progress effectively.",
    },
    {
      id: 3,
      image: "img/testimonial-3.jpg",
      name: "Person Name 3",
      profession: "Profession 3",
      text:   "This platform has greatly improved my ability to manage my assignments and track my progress effectively.",
    },
    {
      id: 4,
      image: "img/testimonial-2.jpg",
      name: "Person Name 4",
      profession: "Profession 4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis blanditiis excepturi quisquam temporibus voluptatum reprehenderit culpa, quasi corrupti laborum accusamus.",
    },
  ];

  // Paramètres de configuration pour le slider (carousel)
  const settings = {
    dots: true,        // Afficher les points de navigation
    infinite: true,    // Faire défiler en boucle
    speed: 500,        // Vitesse de transition
    slidesToShow: 1,   // Nombre de témoignages visibles à la fois
    slidesToScroll: 1, // Nombre de témoignages défilés à la fois
    autoplay: true,    // Activer l'autoplay
    autoplaySpeed: 2000, // Vitesse de défilement automatique
  };

  return (
    <div className="container-fluid testimonial pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
          <h4 style={{ color: "#9b7cd4" }}>Testimonial</h4>
          <h1 className="display-5 mb-4">Our Clients Reviews</h1>
          <p className="mb-0">
          Our clients have shared valuable feedback, helping us improve and refine the platform. Their reviews highlight the ease of use and effectiveness of the solution in meeting their needs.
          </p>
        </div>
        {/* Slider pour afficher les témoignages */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-item">
              <div className="testimonial-quote-left">
                <i className="fas fa-quote-left fa-2x"></i>
              </div>
              <div className="testimonial-img">
                <img src={testimonial.image} className="img-fluid" alt="Image" />
              </div>
              <div className="testimonial-text">
                <p className="mb-0">{testimonial.text}</p>
              </div>
              <div className="testimonial-title">
                <div>
                  <h4 className="mb-0">{testimonial.name}</h4>
                  <p className="mb-0">{testimonial.profession}</p>
                </div>
                <div className="d-flex" style={{ color: 'purple' }}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>

              </div>
              <div className="testimonial-quote-right">
                <i className="fas fa-quote-right fa-2x"></i>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
