import React, { useState, useEffect } from 'react';

const PurposePage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [stats, setStats] = useState({
    helpers: 0,
    connections: 0,
    cities: 0
  });

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        helpers: 10000,
        connections: 45000,
        cities: 200
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const interestingFacts = [
    {
      icon: "🇮🇳",
      title: "470 Million Workers",
      description: "India has over 470 million workers in the informal sector, many of whom are skilled craftspeople looking for opportunities.",
      highlight: "Every 3rd person you meet"
    },
    {
      icon: "📱",
      title: "Digital Leap",
      description: "Rural India is experiencing a digital revolution with smartphone penetration reaching 77% in 2024.",
      highlight: "Technology bridging gaps"
    },
    {
      icon: "🏘️",
      title: "Neighborhood Economy",
      description: "Studies show that 85% of service needs are fulfilled within a 5km radius of people's homes.",
      highlight: "Local solutions work best"
    },
    {
      icon: "⚡",
      title: "Speed of Trust",
      description: "Word-of-mouth recommendations are 4x more trusted than online reviews in Indian communities.",
      highlight: "Community trust matters"
    },
    {
      icon: "💰",
      title: "Economic Impact",
      description: "Every rupee spent on local services generates ₹2.50 of economic activity in the community.",
      highlight: "Multiplier effect in action"
    },
    {
      icon: "🌱",
      title: "Skill Heritage",
      description: "Many traditional Indian crafts and skills are passed down through generations, representing centuries of expertise.",
      highlight: "Living cultural heritage"
    }
  ];

  const values = [
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "Building genuine connections based on trust, with real people helping real people in their communities."
    },
    {
      icon: "⚡",
      title: "Simplicity First",
      description: "No complex processes or hidden fees. Just simple, direct connections between helpers and those who need help."
    },
    {
      icon: "🌱",
      title: "Community Growth",
      description: "Every connection strengthens our local communities, creating networks of support that last."
    }
  ];

  return (
    <div className="purpose-page">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

        .purpose-page {
          font-family: 'Montserrat', sans-serif;
          background-color: #f9fdfb;
          min-height: 100vh;
        }

        /* Hero Section */
        .purpose-hero {
          background: linear-gradient(135deg, rgba(28, 103, 88, 0.95), rgba(13, 75, 62, 0.95)), 
                      url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 5rem 1rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .purpose-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(28, 103, 88, 0.8), rgba(13, 75, 62, 0.9));
          z-index: 1;
        }

        .purpose-hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .purpose-hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
          animation: slideInDown 1s ease-out;
        }

        .purpose-hero h1::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
          animation: slideInUp 1s ease-out 0.5s both;
        }

        .purpose-hero p {
          font-size: 1.3rem;
          margin-top: 2rem;
          opacity: 0.95;
          line-height: 1.6;
          animation: fadeInUp 1s ease-out 0.8s both;
        }

        .hindi-text {
          font-size: 1.1rem;
          margin-top: 1rem;
          opacity: 0.9;
          font-style: italic;
          animation: fadeInUp 1s ease-out 1s both;
        }

        /* Stats Section */
        .stats-section {
          background: white;
          padding: 3rem 1rem;
          margin-top: -3rem;
          position: relative;
          z-index: 3;
        }

        .stats-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #1c6758, #0d4b3e);
          color: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          transform: translateY(0);
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(28, 103, 88, 0.3);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(28, 103, 88, 0.4);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: block;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Mission Section */
        .mission-section {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #f0f9ff, #ecfdf5);
        }

        .mission-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .mission-content h2 {
          font-size: 2.5rem;
          color: #1c6758;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .mission-content h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
        }

        .mission-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #444;
          margin-bottom: 1.5rem;
        }

        .mission-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .mission-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        /* Interesting Facts Section */
        .facts-section {
          padding: 4rem 1rem;
          background: white;
        }

        .facts-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .facts-section h2 {
          font-size: 2.5rem;
          color: #1c6758;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .facts-section h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
        }

        .facts-subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .facts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .fact-card {
          background: #f8fafc;
          padding: 2.5rem 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .fact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
        }

        .fact-card:hover {
          transform: translateY(-10px);
          border-color: #1c6758;
          background: white;
          box-shadow: 0 15px 30px rgba(28, 103, 88, 0.15);
        }

        .fact-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .fact-card h3 {
          color: #1c6758;
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .fact-highlight {
          color: #10b981;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .fact-card p {
          color: #666;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* Values Section */
        .values-section {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #f0f9ff, #ecfdf5);
        }

        .values-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .values-section h2 {
          font-size: 2.5rem;
          color: #1c6758;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .values-section h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
        }

        .values-subtitle {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .value-card {
          background: white;
          padding: 2.5rem 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .value-card:hover {
          transform: translateY(-10px);
          border-color: #1c6758;
          box-shadow: 0 15px 30px rgba(28, 103, 88, 0.15);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .value-card h3 {
          color: #1c6758;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .value-card p {
          color: #666;
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #1c6758, #0d4b3e);
          color: white;
          text-align: center;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          line-height: 1.6;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: inline-block;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .cta-btn-primary {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          color: white;
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }

        .cta-btn-secondary {
          background: white;
          color: #1c6758;
          border: 2px solid white;
        }

        .cta-btn-secondary:hover {
          background: transparent;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
        }

        /* Animations */
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .purpose-hero h1 {
            font-size: 2.8rem;
          }
          
          .mission-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .facts-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .purpose-hero h1 {
            font-size: 2.2rem;
          }
          
          .purpose-hero p {
            font-size: 1.1rem;
          }
          
          .stats-container {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .purpose-hero {
            padding: 4rem 1rem;
          }
          
          .purpose-hero h1 {
            font-size: 1.8rem;
          }
          
          .mission-content h2,
          .facts-section h2,
          .values-section h2,
          .cta-section h2 {
            font-size: 2rem;
          }
          
          .facts-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="purpose-hero">
        <div className="purpose-hero-content">
          <h1>Empowering Lives Through Connection</h1>
          <p>
            Bridging the gap between those who need help and those who provide it. 
            Creating opportunities, building communities, transforming lives.
          </p>
          <p className="hindi-text">
            "हर मदद एक नई उम्मीद है, हर कनेक्शन एक नया मौका है"
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">{stats.helpers.toLocaleString()}+</span>
            <span className="stat-label">Helpers Connected</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.connections.toLocaleString()}+</span>
            <span className="stat-label">Successful Connections</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.cities}+</span>
            <span className="stat-label">Cities Covered</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              <strong>HelpNearMe</strong> was born from a simple yet powerful idea: everyone deserves the opportunity to earn a dignified living, and everyone deserves access to reliable help when they need it.
            </p>
            <p>
              In India, millions of skilled workers struggle to find consistent work opportunities. Meanwhile, families and businesses struggle to find trustworthy local help. We bridge this gap through technology, creating a win-win ecosystem that empowers communities.
            </p>
            <p>
              <em>"We don't just connect services - we connect lives, dreams, and futures."</em>
            </p>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Community helping each other" />
          </div>
        </div>
      </section>

      {/* Interesting Facts Section */}
      <section className="facts-section">
        <div className="facts-container">
          <h2>Did You Know?</h2>
          <p className="facts-subtitle">
            Fascinating insights about India's service economy and the communities we serve
          </p>
          <div className="facts-grid">
            {interestingFacts.map((fact, index) => (
              <div key={index} className="fact-card">
                <span className="fact-icon">{fact.icon}</span>
                <span className="fact-highlight">{fact.highlight}</span>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <h2>Our Core Values</h2>
          <p className="values-subtitle">
            The principles that guide everything we do at HelpNearMe
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Join the Movement</h2>
          <p>
            Be part of a platform that's changing lives across India. Whether you need help or know someone who can provide it, you can make a difference today.
          </p>
          <div className="cta-buttons">
            <a href="/add-helper" className="cta-btn cta-btn-primary">
              Add a Helper Today
            </a>
            <a href="/" className="cta-btn cta-btn-secondary">
              Find Help Near You
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurposePage;