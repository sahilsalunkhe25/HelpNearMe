import React from 'react';
import '../pages/HomePage.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} HelpNearMe. All rights reserved.</p>
        <Link to="/admin">Admin</Link>
      </div>
    </footer>
  );
};

export default Footer;