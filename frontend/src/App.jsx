
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/searchPage';
import Landing from './pages/Landing';
import CandidateProfile from './pages/CandidatesPage';
import CandidateEditPage from './pages/CandidatesEditPage';
import { DarkModeProvider } from './components/DarkModeContext';
import AppRoutes from './routes/Routes';

export default function App() {
  return (
    <DarkModeProvider>

    
    <Router>
    
      <AppRoutes />

    </Router>
    </DarkModeProvider>
  );
}
