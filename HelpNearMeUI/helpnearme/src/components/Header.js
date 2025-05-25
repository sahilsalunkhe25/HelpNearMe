import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';

const Header = () => {
  return (
    <header className="custom-header">
      <div className="container">
        <h1 className="logo">HelpNearMe</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add-helper">Add Your Contacts</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;