import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE from '../api';
import { Trash } from 'lucide-react'; // Import trash icon from lucide-react

const AdminDashboard = () => {
  const [helpers, setHelpers] = useState([]);
  const [error, setError] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');

  const fetchHelpers = async () => {
    try {
      const res = await fetch(`${API_BASE}/helpers/getAllHelpers`);
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched helpers:', data);
        setHelpers(data);
      } else {
        setError('Failed to fetch helpers');
      }
    } catch (err) {
      console.error('Error fetching helpers:', err);
      setError('An error occurred while fetching helpers');
    }
  };

  const deleteHelper = async (helperId) => {
    if (window.confirm('Are you sure you want to delete this helper?')) {
      try {
        const res = await fetch(`${API_BASE}/helpers/delete/${helperId}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          setDeleteStatus('Helper deleted successfully');
          // Remove deleted helper from state
          setHelpers(helpers.filter(helper => helper.id !== helperId));
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setDeleteStatus('');
          }, 3000);
        } else {
          setError('Failed to delete helper');
          
          // Clear error message after 3 seconds
          setTimeout(() => {
            setError('');
          }, 3000);
        }
      } catch (err) {
        console.error('Error deleting helper:', err);
        setError('An error occurred while deleting helper');
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      
      {error && <p style={styles.errorMessage}>{error}</p>}
      {deleteStatus && <p style={styles.successMessage}>{deleteStatus}</p>}
      
      {helpers.length === 0 ? (
        <p>No helpers found</p>
      ) : (
        <div>
          <h3>All Helpers</h3>
          <ul style={styles.helperList}>
            {helpers.map((helper) => (
              <li key={helper.id} style={styles.listItem}>
                <div style={styles.helperCard}>
                  <div style={styles.helperHeader}>
                    <h4 style={styles.helperName}>{helper.name}</h4>
                    <button 
                      onClick={() => deleteHelper(helper.id)} 
                      style={styles.deleteButton}
                      aria-label="Delete helper"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                  <p><strong>Occupation:</strong> {helper.profession}</p>
                  <p><strong>Phone:</strong> {helper.phone}</p>
                  <p><strong>City:</strong> {helper.city}</p>
                  <p><strong>Town:</strong> {helper.town}</p>
                  <p><strong>Pincode:</strong> {helper.pincode}</p>
                  {helper.address && <p><strong>Address:</strong> {helper.address}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Link to="/addhelper" style={styles.addHelperLink}>
        Add New Helper
      </Link>
    </div>
  );
};

const styles = {
  helperList: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    margin: '0 0 16px 0',
  },
  helperCard: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  helperHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  helperName: {
    margin: 0,
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#dc3545',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '4px',
  },
  addHelperLink: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#0077cc',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  },
  errorMessage: {
    color: '#dc3545',
    padding: '10px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  successMessage: {
    color: '#28a745',
    padding: '10px',
    backgroundColor: '#d4edda',
    borderRadius: '4px',
    marginBottom: '16px',
  }
};

export default AdminDashboard;