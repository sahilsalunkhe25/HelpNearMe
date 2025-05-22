import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE from '../api';

const HelperDetailsPage = () => {
  const { id } = useParams();
  const [helper, setHelper] = useState(null);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHelper = async () => {
      try {
        const res = await fetch(`${API_BASE}/helpers/${id}`);
        const data = await res.json();
        setHelper(data);
      } catch (err) {
        setError('Error fetching helper details');
      }
    };
    fetchHelper();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/helpers/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: parseInt(rating), comment: review }) // <-- changed from 'review' to 'comment'
      });
      if (res.ok) {
        alert('Review added successfully');
        setRating('');
        setReview('');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add review');
      }
    } catch (err) {
      setError('An error occurred while adding the review');
    }
  };
  

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      {helper ? (
        <>
          <h2>{helper.name} ({helper.occupation})</h2>
          <p><strong>Phone:</strong> {helper.phone}</p>
          <p><strong>Address:</strong> {helper.address}</p>
          <p><strong>City:</strong> {helper.city}</p>
          <p><strong>Town:</strong> {helper.town}</p>
          <p><strong>Rating:</strong> {helper.ratingCount > 0 ? (helper.ratingTotal / helper.ratingCount).toFixed(1) : 'Not Rated'}</p>
          <h3>Leave a Review</h3>
          <form onSubmit={handleAddReview}>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" required min="1" max="5" />
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review" required></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HelperDetailsPage;
