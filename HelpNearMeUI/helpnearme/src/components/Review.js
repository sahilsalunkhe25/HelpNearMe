import React, { useState, useEffect } from 'react';

// Star Rating component that can be both interactive (for adding reviews) or static (for displaying)
const StarRating = ({ rating, setRating, interactive = false }) => {
  const [hover, setHover] = useState(0);
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => interactive && setRating(starValue)}
            onMouseEnter={() => interactive && setHover(starValue)}
            onMouseLeave={() => interactive && setHover(0)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

// Confirmation Modal for reporting helpers
const ReportConfirmationModal = ({ helperId, helperName, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const API_BASE = 'http://localhost:8081';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/helpers/report/${helperId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      
      const result = await response.text();
      onSuccess(result);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your report');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Flag {helperName}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body" style={{ padding: '20px' }}>
          {error && <div className="error-message">{error}</div>}
          
          <p>Are you sure you want to flag this helper?</p>
          <p>Flagging means you're reporting inappropriate or unhelpful behavior. </p>
            <p> If a helper receives too many flags, they may be removed from the platform.</p>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="report-btn-confirm" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal for adding a new review
const AddReviewModal = ({ helperId, helperName, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const API_BASE = 'http://localhost:8081';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const reviewData = {
        name,
        rating,
        comment
      };
      
      const response = await fetch(`${API_BASE}/helpers/${helperId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      // Review submitted successfully
      onSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your review');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Review for {helperName}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="review-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Your Rating</label>
            <StarRating rating={rating} setRating={setRating} interactive={true} />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Your Name (Optional)</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comment (Optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this helper"
              rows={4}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for viewing all reviews of a helper
const ReviewsModal = ({ helperId, helperName, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportResult, setReportResult] = useState('');
  
  const API_BASE = 'http://localhost:8081';
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE}/helpers/${helperId}/reviews`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Could not load reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [helperId]);
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReportSuccess = (message) => {
    setShowReportModal(false);
    setReportResult(message);
    // Close the modal after 3 seconds if the helper was deleted
    if (message.includes("deleted")) {
      setTimeout(() => onClose(), 3000);
    }
  };
  
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content reviews-modal">
          <div className="modal-header">
            <h3>Reviews for {helperName}</h3>
            <div className="modal-actions">
              <button 
                className="report-btn" 
                onClick={() => setShowReportModal(true)}
              >
                Flag this Person
              </button>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
          </div>
          
          <div className="reviews-content">
            {reportResult && (
              <div className="report-result" style={{
                padding: '10px',
                margin: '0 0 15px',
                backgroundColor: reportResult.includes("deleted") ? '#fdf0ed' : '#e8f5e9',
                color: reportResult.includes("deleted") ? '#e74c3c' : '#2e7d32',
                borderRadius: '4px'
              }}>
                {reportResult}
              </div>
            )}
            
            {loading && <p className="loading-text">Loading reviews...</p>}
            
            {error && <p className="error-text">{error}</p>}
            
            {!loading && !error && reviews.length === 0 && (
              <p className="no-reviews">No reviews yet for this helper.</p>
            )}
            
            {!loading && !error && reviews.length > 0 && (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">
                        {review.name || 'Anonymous'}
                      </div>
                      <div className="review-date">
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    
                    <StarRating rating={review.rating} interactive={false} />
                    
                    {review.comment && (
                      <p className="review-comment">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button className="close-btn-footer" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportConfirmationModal 
          helperId={helperId} 
          helperName={helperName} 
          onClose={() => setShowReportModal(false)}
          onSuccess={handleReportSuccess}
        />
      )}
    </>
  );
};

export { AddReviewModal, ReportConfirmationModal,ReviewsModal, StarRating};