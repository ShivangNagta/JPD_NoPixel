import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Landing from './pages/Landing';
import CandidateProfile from './pages/CandidatesPage';
import { DarkModeProvider } from './components/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>

    
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Candidate Profile Page */}
        <Route path="/profile/:id" element={<CandidateProfile />} /> 
      </Routes>
    </Router>
    </DarkModeProvider>
  );
}