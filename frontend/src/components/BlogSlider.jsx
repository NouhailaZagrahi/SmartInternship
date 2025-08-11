import React from "react";
import "../css/BlogSlider.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const BlogSlider = () => {
  const options = {
    loop: true,
    margin: 25,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 1000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };

  const blogItems = [
    {
      img: "img/service-1.jpg",
      title: "AI & Machine Learning",
      heading: "How Generative AI is Transforming Industries",
      content: "Explore the impact of ChatGPT, Midjourney, and other AI tools on sectors like education, marketing, and software development.",
      authorImg: "img/testimonial-1.jpg",
      author: "Admin",
      date: "April 22, 2025"
    },
    {
      img: "img/service-1.jpg",
      title: "Cybersecurity",
      heading: "Top Cybersecurity Trends in 2025",
      content: "From Zero Trust models to AI-driven threat detection—see how organizations are protecting their data in a hyper-connected world.",
      authorImg: "img/testimonial-2.jpg",
      author: "Admin",
      date: "April 20, 2025"
    },
    {
      img: "img/service-1.jpg",
      title: "Cloud & DevOps",
      heading: "Why Cloud-Native is the Future of DevOps",
      content: "Containers, Kubernetes, and serverless architectures are redefining how apps are built and deployed across the globe.smthsmthsmthsmthsmthsmth",
      authorImg: "img/testimonial-3.jpg",
      author: "Admin",
      date: "April 18, 2025"
    },
    {
      img: "img/service-1.jpg",
      title: "Web3 & Blockchain",
      heading: "Decentralization: Beyond Cryptocurrency",
      content: "Discover how blockchain is powering identity, supply chain, and decentralized finance solutions beyond just crypto.smthsmthsmthsmthsmthsmth",
      authorImg: "img/testimonial-1.jpg",
      author: "Admin",
      date: "April 15, 2025"
    }
  ];
  

  return (
    <div className="container-fluid blog pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
          <h4 className="text-primary">Our Blog & News</h4>
          <h1 className="display-5 mb-4">Articles For Pro Traders</h1>
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate...
          </p>
        </div>

        <OwlCarousel className="owl-theme" {...options}>
          {blogItems.map((item, index) => (
            <div className="blog-item p-4" key={index}>
              <div className="blog-img mb-4">
                <img src={item.img} className="img-fluid w-100 rounded" alt="" />
                <div className="blog-title">
                  <a href="#" className="btn">{item.title}</a>
                </div>
              </div>
              <a href="#" className="h4 d-inline-block mb-3">{item.heading}</a>
              <p className="mb-4">{item.content}</p>
              <div className="d-flex align-items-center">
                <img src={item.authorImg} className="img-fluid rounded-circle" style={{ width: "60px", height: "60px" }} alt="" />
                <div className="ms-3">
                  <h5>{item.author}</h5>
                  <p className="mb-0">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default BlogSlider;
