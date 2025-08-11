import React, { useState } from 'react';

const EntrepriseSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    location: '',
    domain: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Entreprise SignUp Data:', formData);
    // You can add API call here
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Entreprise Sign Up</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter location"
                onChange={handleChange}
                value={formData.location}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Domain</label>
              <input
                type="text"
                name="domain"
                className="form-control"
                placeholder="Enter domain"
                onChange={handleChange}
                value={formData.domain}
                required
              />
            </div>
            <button type="submit" className="btn btn-purple w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseSignUp;
