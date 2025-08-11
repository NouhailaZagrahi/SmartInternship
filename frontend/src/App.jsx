import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StagiaireProvider } from "./context/StagiaireContext";
import Header from "./components/components_stagiaire/Header";
import Footer from "./components/components_stagiaire/Footer";
import Navheader from "./components/components_stagiaire/NavHeader";
import Sidebar from "./components/components_stagiaire/Sidebar";

import HomeStagiaire from "./pages/pages_stagiaire/HomeStagiaire";
import ProfileStagiaire from "./pages/pages_stagiaire/ProfileStagiaire";
import PostEnregistres from "./pages/pages_stagiaire/PostEnregistres";
import StagiaireCandidature from "./pages/pages_stagiaire/StagiareCandidatures";
import Stagiaire_stageRealises from "./pages/pages_stagiaire/Stagiaire_stageRealises";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import EntrepriseServices from "./pages/EntrepriseServices";
import StudentServices from "./pages/StudentServices";
import ChoiceSign from "./pages/ChoiceSign";
import EntrepriseSignUp from "./pages/EntrepriseSignUp";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filters) => {
    const filtered = jobs.filter((job) => {
      return (
        (filters.location === "" || job.location === filters.location) &&
        (filters.domain === "" || job.domain === filters.domain) &&
        (filters.preEmbauche === "" ||  String(job.preEmbauche) === filters.preEmbauche) &&
        (filters.paid === "" ||  String(job.paid) === filters.pais) &&
        (filters.type === "" || job.typeDeStage === filters.type) &&
        (filters.duration === "" || String(job.duration) === filters.duration)
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <StagiaireProvider>
      <Router>
        <Routes>
          {/* Routes sans layout */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/entrepriseservices" element={<EntrepriseServices />} />
          <Route path="/studentservices" element={<StudentServices />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/choice" element={<ChoiceSign />} />
          <Route path="/Esign" element={<EntrepriseSignUp />} />

          {/* Routes AVEC layout */}
          <Route
            path="/*"
            element={
              <div id="main-wrapper">
                <Navheader />
                <Header
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                />
                <Sidebar />

                <Routes>
                  <Route
                    path="/:idstagiaire/home"
                    element={
                      <HomeStagiaire
                        jobs={jobs}
                        filteredJobs={filteredJobs}
                        setJobs={setJobs}
                        setFilteredJobs={setFilteredJobs}
                      />
                    }
                  />
                  <Route
                    path="/:idstagiaire/profile"
                    element={<ProfileStagiaire />}
                  />
                  <Route
                    path="/:idstagiaire/saved-posts"
                    element={<PostEnregistres />}
                  />
                  <Route
                    path="/:idstagiaire/stages"
                    element={<Stagiaire_stageRealises />}
                  />
                  <Route
                    path="/:idstagiaire/candidature"
                    element={<StagiaireCandidature />}
                  />
                </Routes>

                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </StagiaireProvider>
  );
};

export default App;
