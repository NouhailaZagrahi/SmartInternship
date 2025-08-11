import React from "react";

const ProfileSettings = ({
  profileForm,
  handleProfileChange,
  handleProfileSubmit,
  successMessage,
  errorMessage,
}) => {
  return (
    <div className="pt-3">
      <div className="settings-form">
        <h4 className="text-primary">Account Setting</h4>

        {/* Affichage des messages */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleProfileSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label>CV</label>
              <input
                type="file"
                name="cv"
                onChange={handleProfileChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleProfileChange}
                className="form-control"
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
