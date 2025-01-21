import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/searchPage';
import Landing from './pages/Landing';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Search Page */}
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}
