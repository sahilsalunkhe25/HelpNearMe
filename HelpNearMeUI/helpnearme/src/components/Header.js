import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';

const Header = () => {
  return (
    <header className="custom-header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">HelpNearMe</Link>
        </h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/purpose">Our Purpose</Link>
          <Link to="/add-helper">Click here to make someone's day :)</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;