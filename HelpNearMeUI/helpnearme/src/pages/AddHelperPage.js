import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddHelperPage.css'; 

const AddHelperPage = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState([]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Popular profession options for quick selection
  const popularProfessions = [
  "Electrician", "Plumber", "Carpenter", 
  "Painter", "AC Mechanic", "Tailor", 
  "Gardener", "Cook", "Cleaner", 
  "Driver", "Maid", "Babysitter", 
  "Security Guard", "Mechanic", "Washerman", 
  "Delivery Person", "Tutor", "Barber", 
  "Pest Control", "Technician", "Welder", 
  "Mason", "Roofer", "Laundry"
];


  const handleAddHelper = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const API_BASE = 'https://helpnearme.onrender.com'; 
      const res = await fetch(`${API_BASE}/helpers/addhelper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          profession: profession.join(', '),  
          phone,
          address,
          city,
          town,
          pincode
        })
      });
      
      if (res.ok) {
        setSuccess(true);
        // Reset form fields
        setName('');
        setProfession([]);
        setPhone('');
        setAddress('');
        setCity('');
        setTown('');
        setPincode('');
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          navigate('/');
        }, 6000);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add helper');
      }
    } catch (err) {
      setError('An error occurred while adding the helper. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfessionSelect = (prof) => {
    setProfession((prev) =>
      prev.includes(prof)
        ? prev.filter((p) => p !== prof)  
        : [...prev, prof]                 
    );
  };
  

  return (
    <div className="add-helper-page">
      <div className="add-helper-hero">
        <div className="add-helper-hero-content">
          <h1>Know an Electrician, Plumber or a Local Help near you?</h1>
          <p>Help improve someone's livelihood by adding them to our network</p>
        </div>
      </div>
      
      <div className="container">
        <div className="add-helper-container">
          <div className="add-helper-info">
            <div className="info-card">
              <div className="info-icon">🤝</div>
              <h3>Why Add a Helper?</h3>
              <p>By adding a skilled worker to our platform, you're helping them find more opportunities and improve their livelihood.</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">✅</div>
              <h3>What Happens Next?</h3>
              <p>Once added, the helper will be visible to people searching in their area, helping them connect with potential clients.</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">💼</div>
              <h3>Who Can I Add?</h3>
              <p>Any skilled worker who provides services like plumbing, electrical work, carpentry, cleaning, cooking, etc.</p>
            </div>
          </div>
          
          <div className="add-helper-form-container">
            <div className="form-header">
              <h2>Helper Details</h2>
              <p>Please fill in all the information accurately</p>
            </div>
            
            {success ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Helper Added Successfully!</h3>
                <p>Thank you for your contribution. Redirecting to homepage...</p>
              </div>
            ) : (
              <form onSubmit={handleAddHelper} className="add-helper-form">
                <div className="form-group">
                  <label htmlFor="name">Helper's Full Name<span style={{ color: 'red' }}> *</span></label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="profession">Profession(s)<span style={{ color: 'red' }}> *</span></label>
                  <input
                    id="profession"
                    type="text"
                    placeholder="Selected professions"
                    value={profession.join(', ')} // show as comma-separated
                    readOnly
                  />
                  <div className="profession-suggestions">
                    {popularProfessions.map((prof) => (
                      <span 
                        key={prof}
                        className={`profession-tag ${profession.includes(prof) ? 'active' : ''}`}
                        onClick={() => handleProfessionSelect(prof)}
                      >
                        {prof}
                      </span>
                    ))}
                  </div>
                </div>
               
                <div className="form-group">
                  <label htmlFor="phone">Phone Number<span style={{ color: 'red' }}> *</span></label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}                    
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City<span style={{ color: 'red' }}> *</span></label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="town">Town/Area<span style={{ color: 'red' }}> *</span></label>
                    <input
                      id="town"
                      type="text"
                      placeholder="Town or Area"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                <label htmlFor="pincode">Pincode<span style={{ color: 'red' }}> *</span></label>
                <input
                    id="pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pincode"
                  />
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Helper'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="helper-testimonial">
          <div className="testimonial-quote">"</div>
          <p>After my neighbor added me to HelpNearMe, I started getting regular work calls. My income has increased, and I can finally provide better education for my children."</p>
          <div className="testimonial-author">
            <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1470&auto=format&fit=crop" alt="Helper" />
            <div>
              <strong>Ravi Kumar</strong>
              <span>Electrician, Delhi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHelperPage;