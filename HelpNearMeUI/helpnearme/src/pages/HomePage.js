import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { AddReviewModal, ReviewsModal, StarRating } from '../components/Review';

// Add CSS import for the new review components
import '../components/Review.css';

const Homepage = () => {
  const [pincode, setPincode] = useState('');
  const [helpers, setHelpers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [profession, setProfession] = useState('');


  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);

  const API_BASE = 'http://localhost:8081';
  
  // Success stories data
  const successStories = [
    {
      id: 1,
      name: "Ramesh Kumar",
      profession: "Electrician",
      image: "https://images.unsplash.com/photo-1695398170358-99749f64c887?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "After 10 years of struggle finding regular work, joining HelpNearMe has changed my life. I now receive 5-6 calls daily and have doubled my monthly income.",
      location: "Varanasi, UP"
    },
    {
      id: 2,
      name: "Lakshmi Devi",
      profession: "Tailor",
      image: "https://images.unsplash.com/photo-1624354865912-fdf2f0e09a21?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "As a single mother, finding stable work was difficult. Through this platform, I now have regular customers and can provide better education for my children.",
      location: "Jaipur, Rajasthan"
    },
    {
      id: 3,
      name: "Mohammed Farooq",
      profession: "Plumber",
      image: "https://images.unsplash.com/photo-1619207523526-c6a4a2cf3c3a?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "I used to wait on street corners hoping someone would hire me. Now customers call me directly through the app, giving me dignity and consistent income.",
      location: "Kochi, Kerala"
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1669829528850-959d7b08278b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Found a skilled carpenter within minutes! The service was prompt and professional.",
      rating: 5
    },
    {
      id: 2,
      name: "Arjun Mehta",
      image: "https://images.unsplash.com/photo-1729157661483-ed21901ed892?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The platform helped me connect with a local electrician who fixed issues that had been troubling us for weeks.",
      rating: 5
    },
    {
      id: 3,
      name: "Sneha Verma",
      image: "https://images.unsplash.com/photo-1544264796-acfb69e05b37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Excellent platform! I needed urgent plumbing help and found someone nearby who came within an hour.",
      rating: 4
    }
  ];

  // Popular service categories
  const serviceCategories = [
    { name: "Electricians", icon: "⚡", color: "#FFD700" },
    { name: "Plumbers", icon: "🔧", color: "#4682B4" },
    { name: "Carpenters", icon: "🪚", color: "#8B4513" },
    { name: "Painters", icon: "🖌️", color: "#FF6347" },
    { name: "Housekeeping", icon: "🧹", color: "#20B2AA" },
  ];
  
  // Function to handle banner/hero slideshow
  useEffect(() => {
    const slides = document.querySelectorAll('.hero-bg-slide');
    const interval = setInterval(() => {
      slides.forEach((slide) => slide.classList.remove('active'));
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        slides[next].classList.add('active');
        return next;
      });
    }, 5000);
    
    // Set first slide as active initially
    slides[0].classList.add('active');
    
    return () => clearInterval(interval);
  }, []);

  // Function to rotate through success stories
  useEffect(() => {
    const storyInterval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 8000);
    
    return () => clearInterval(storyInterval);
  }, []);

  const handleSearch = async () => {
    try {
      let url = `${API_BASE}/helpers/pincode/${pincode}`;
     if (profession && profession !== 'All') {
      url += `/profession/${encodeURIComponent(profession)}`;
    }
  
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
  
      const data = await res.json();
      setHelpers(data);
      setShowPopup(true);
      setMinimized(false);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not fetch helpers. Please try again.');
      setShowPopup(true);
      setHelpers([]);
    }
  };
  

  // Generate star display based on rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
  };

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-bg-slider">
          <div className="hero-bg-slide"></div>
          <div className="hero-bg-slide"></div>
          <div className="hero-bg-slide"></div>
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-decorative hero-decorative-topleft"></div>
            <div className="hero-decorative hero-decorative-bottomright"></div>
            
            <h1 className="hero-title">Need an Electrician, Plumber, or  <span className="hero-title-accent">Local Help?</span></h1>
            <p className="hero-subtitle">Just enter your pincode and use filter to instantly find trusted people near you — electricians, plumbers, carpenters, tailors, and more!</p>
            
          <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        borderRadius: '50px',
        padding: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '1000px',
        margin: 'auto',
        gap: '12px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Input */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1,
          background: '#f7f7f7',
          borderRadius: '40px',
          padding: '8px 16px',
        }}
      >
        <span 
          style={{ 
            fontSize: '18px', 
            marginRight: '10px',
            color: '#FF4081',
          }}
        >
          📍
        </span>
        <input
          type="text"
          placeholder="Enter your pincode..."
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1rem',
            color: '#333',
            outline: 'none',
            width: '100%',
            padding: '10px 0',
          }}
        />
      </div>

      {/* Dropdown */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#f7f7f7',
          borderRadius: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
        }}
      >
        <span style={{ fontSize: '18px', margin: '0 8px', color: '#0d4b3e' }}>🛠️</span>
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#333',
            fontWeight: '500',
            fontSize: '1rem',
            padding: '14px 36px 14px 4px',
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
            minWidth: '180px',
          }}
        >
        <option value="" style={{ fontWeight: 'bold' }}>Filter By Category</option>
        <option value="All">🌐 All Categories</option>
        <option value="Electrician">⚡ Electrician</option>
        <option value="Plumber">🚿 Plumber</option>
        <option value="Carpenter">🪚 Carpenter</option>
        <option value="Painter">🖌️ Painter</option>
        <option value="AC Mechanic">❄️ AC Mechanic</option>
        <option value="Tailor">🧵 Tailor</option>
        <option value="Gardener">🪴 Gardener</option>
        <option value="Cook">👨‍🍳 Cook</option>
        <option value="Cleaner">🧹 Cleaner</option>
        <option value="Driver">🚗 Driver</option>
        <option value="Maid">👩‍🦰 Maid</option>
        <option value="Babysitter">👶 Babysitter</option>
        <option value="Security Guard">🛡️ Security Guard</option>
        <option value="Mechanic">🔧 Mechanic</option>
        <option value="Washerman">🧺 Washerman</option>
        <option value="Delivery Person">📦 Delivery Person</option>
        <option value="Tutor">📚 Tutor</option>
        <option value="Barber">💈 Barber</option>
        <option value="Pest Control">🐜 Pest Control</option>
        <option value="Technician">🛠️ Technician</option>
        <option value="Welder">🔥 Welder</option>
        <option value="Mason">🧱 Mason</option>
        <option value="Roofer">🏠 Roofer</option>
        <option value="Laundry">🧼 Laundry</option>

        </select>

        {/* Custom down arrow */}
        <svg
          width="12"
          height="8"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            right: '16px',
            pointerEvents: 'none',
          }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#0d4b3e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: '#0d4b3e',
          color: '#fff',
          border: 'none',
          borderRadius: '40px',
          padding: '14px 28px',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 8px 15px rgba(13, 75, 62, 0.25)',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 20px rgba(13, 75, 62, 0.35)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 15px rgba(13, 75, 62, 0.25)';
        }}
      >
        <span>🔍</span>
        <span>Search</span>
      </button>
    </div>

          
            <div className="hero-badges">
              <div className="hero-badge">
                <div className="hero-badge-icon">✓</div>
                <span>Skilled Helpers</span>
              </div>
              <div className="hero-badge">
                <div className="hero-badge-icon">⚡</div>
                <span>Direct Contact</span>
              </div>
              <div className="hero-badge">
                <div className="hero-badge-icon">★</div>
                <span>No Money Involved</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-arrow"></div>
        </div>
      </section>
      
      {/* New Popular Services Section */}
      <section className="popular-services">
        <div className="container">
          <h2 className="section-title">Popular Services By Our <span className="text-accent">Helpers</span></h2>
          <p className="section-subtitle">Find skilled professionals for all your household needs</p>
          
          <div className="service-categories">
            {serviceCategories.map((category, index) => (
              <div 
                key={index} 
                className="service-category"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <div 
                  className="service-icon"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
  <h2>Why Choose HelpNearMe?</h2>
  <div className="feature-cards">
    <div className="card">
      <div className="card-icon">🔒</div>
      <h3>No Login Needed</h3>
      <p>Users can freely add and explore without creating an account.</p>
    </div>
    <div className="card">
      <div className="card-icon">🤝</div>
      <h3>Empowering Laborers</h3>
      <p>Helping hardworking individuals connect with local job opportunities to earn a better livelihood.</p>
    </div>
    <div className="card">
      <div className="card-icon">🏘️</div>
      <h3>Building Strong Communities</h3>
      <p>Facilitating easy access to trusted helpers within your neighborhood to support each other.</p>
    </div>
  </div>
</section>


      {/* New Success Stories Section */}
      <section className="success-stories">
        <div className="container">
          <h2 className="section-title">Success <span className="text-accent">Stories</span></h2>
          <p className="section-subtitle">How HelpNearMe is changing lives across India</p>
          
          <div className="story-spotlight">
            <div className="story-image-container">
              <div className="story-image-circle"></div>
              <img 
                src={successStories[currentStoryIndex].image} 
                alt={successStories[currentStoryIndex].name} 
                className="story-image"
              />
            </div>
            <div className="story-content">
              <div className="story-quote">"</div>
              <p className="story-text">{successStories[currentStoryIndex].story}</p>
              <div className="story-author">
                <strong>{successStories[currentStoryIndex].name}</strong>
                <span>{successStories[currentStoryIndex].profession} | {successStories[currentStoryIndex].location}</span>
              </div>
            </div>
          </div>
          
          <div className="story-indicators">
            {successStories.map((_, index) => (
              <button 
                key={index} 
                className={`story-indicator ${index === currentStoryIndex ? 'active' : ''}`}
                onClick={() => setCurrentStoryIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="community-section">
        <h2>Empowering Local Communities</h2>
        <p>
          HelpNearMe is not just a service finder—it's a step towards supporting the local workforce by connecting
          skilled individuals with those in need.
        </p>
        <div className="community-grid">
          <div className="community-stat">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Registered Helpers</div>
          </div>
          <div className="community-stat">
            <div className="stat-number">200+</div>
            <div className="stat-label">Cities Covered</div>
          </div>
          <div className="community-stat">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Jobs Completed</div>
          </div>
        </div>
        <img
          className="community-image"
          src="https://images.unsplash.com/photo-1597058712635-3182d1eacc1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Community help"
        />
      </section>
      
      {/* New Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our <span className="text-accent">Users Say</span></h2>
          <div className="testimonial-cards">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-user">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-user-image" />
                  <span className="testimonial-user-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* New How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It <span className="text-accent">Works</span></h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Enter Your Pincode</h3>
                <p>Find helpers nearby by entering your 6-digit pincode. Use the category filter to refine your search.</p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Choose a Helper</h3>
                <p>Browse through verified helpers and select based on skills and ratings</p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Service</h3>
                <p>Contact the helper directly and get your work done quickly and efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Local Impact Section */}
      <section className="local-impact">
        <div className="container">
          <div className="impact-wrapper">
            <div className="impact-content">
              <h2>Making a Difference in <span className="text-accent">Local Communities</span></h2>
              <p>Our platform helps bridge the gap between skilled workers and those who need their services. By empowering local workers with technology, we're helping create sustainable livelihoods across India.</p>
              <ul className="impact-list">
                <li>
                  <div className="impact-icon">🏠</div>
                  <div>Supporting local talent and family businesses</div>
                </li>
                <li>
                  <div className="impact-icon">💰</div>
                  <div>Improving income stability for workers</div>
                </li>
                <li>
                  <div className="impact-icon">🤝</div>
                  <div>Building stronger community connections</div>
                </li>
                <li>
                  <div className="impact-icon">📱</div>
                  <div>Bridging the digital divide for rural workers</div>
                </li>
              </ul>
            </div>
            <div className="impact-image">
              <img src="https://images.unsplash.com/photo-1582848890388-83b508e74d44?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Local workers using technology" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-background">
            <div className="cta-content">
              <h2>Do You Know A Helper?</h2>
              <p>Let's make the lives of poor helpers better by adding their contacts :) </p>
              <Link to="/add-helper">
              <button className="cta-button">Add a Helper</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Helpers Popup */}
      {showPopup && (
        <div className={`popup-screen ${minimized ? 'minimized' : ''}`}>
          <div className="popup-header">
            <span>Nearby Helpers</span>
            <div className="popup-buttons">
              <button onClick={() => setMinimized(!minimized)}>{minimized ? '🔼' : '–'}</button>
              <button onClick={() => setShowPopup(false)}>×</button>
            </div>
          </div>
          {!minimized && (
            <div className="popup-content">
              {error && <p className="error-text">{error}</p>}
              {helpers.length === 0 && !error && <p>No helpers found for this pincode.</p>}
              <div className="helper-list">
                {helpers.map((helper) => (
                  <div key={helper.id} className="helper-card">
                    <h4>{helper.name}</h4>
                    <p><strong>Profession:</strong> {helper.profession}</p>
                    <p><strong>Phone:</strong> {helper.phone}</p>
                    <p><strong>City:</strong> {helper.city}</p>
                    <p><strong>Town:</strong> {helper.town}</p>
                    <p><strong>Rating:</strong> {helper.ratingCount > 0 ? (helper.ratingTotal / helper.ratingCount).toFixed(1) : 'N/A'} ⭐</p>
                    <div className="helper-actions">
                      <button 
                        className="contact-btn"
                        onClick={() => {
                          setSelectedHelper(helper);
                          setShowReviewsModal(true);
                        }}
                      >
                        Reviews
                      </button>
                      <button 
                        className="contact-btn"
                        onClick={() => {
                          setSelectedHelper(helper);
                          setShowAddReviewModal(true);
                        }}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Modals */}
      {showAddReviewModal && selectedHelper && (
        <AddReviewModal
          helperId={selectedHelper.id}
          helperName={selectedHelper.name}
          onClose={() => setShowAddReviewModal(false)}
          onSuccess={() => {
            setShowAddReviewModal(false);
            // Refresh helpers data after adding a review
            handleSearch();
          }}
        />
      )}

      {showReviewsModal && selectedHelper && (
        <ReviewsModal
          helperId={selectedHelper.id}
          helperName={selectedHelper.name}
          onClose={() => setShowReviewsModal(false)}
        />
      )}
    </div>
  );
};

export default Homepage;
