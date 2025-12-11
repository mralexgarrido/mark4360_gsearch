import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { CampaignProvider } from './contexts/CampaignContext';
import CampaignSetup from './pages/CampaignSetup';
import Targeting from './pages/Targeting';
import AdCreation from './pages/AdCreation';
import Review from './pages/Review';
// Import PWA reload prompt if desired, or let autoUpdate handle it silently

function App() {
  return (
    <CampaignProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/campaign" replace />} />
            <Route path="/campaign" element={<CampaignSetup />} />
            <Route path="/targeting" element={<Targeting />} />
            <Route path="/ads" element={<AdCreation />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </Layout>
      </Router>
    </CampaignProvider>
  );
}

export default App;
