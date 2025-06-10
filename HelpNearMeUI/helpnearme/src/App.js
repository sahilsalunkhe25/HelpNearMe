import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddHelperPage from './pages/AddHelperPage';
import HelperDetailsPage from './pages/HelperDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PurposePage from './pages/PurposePage';

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.setAttribute('data-goatcounter', 'https://helpnearme.goatcounter.com/count');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on unmount
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-helper" element={<AddHelperPage />} />
        <Route path="/helper/:id" element={<HelperDetailsPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/purpose" element={<PurposePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
