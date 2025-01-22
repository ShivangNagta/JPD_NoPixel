import React from "react";
import { Routes, Route } from "react-router-dom";
import Choose from "../components/Shared/Choose";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ClientDashboard from "../components/Client/ClientDashboard";
import FreelancerDashboard from "../components/Freelancer/FreelancerDashboard";
import Profile from "../components/profile/profile";
import SearchPage from '../pages/SearchPage';
import Landing from '../pages/Landing';
import CandidateProfile from '../pages/CandidatesPage';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/client/dashboard" element={<Landing />} />
      <Route path="/freelancer/dashboard" element={<Landing />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile/:id" element={<CandidateProfile />} /> 
    </Routes>
  );
};

export default AppRoutes;