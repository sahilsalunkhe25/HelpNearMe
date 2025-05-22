import React from 'react';
import '../pages/HomePage.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} HelpNearMe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;