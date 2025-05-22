import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../api';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.inputGroup}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div style={styles.inputGroup}>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  inputGroup: { marginBottom: '1rem' },
  input: { padding: '0.5rem', fontSize: '1rem', width: '100%' },
  button: { padding: '0.5rem 1rem', backgroundColor: '#0077cc', color: 'white', border: 'none', cursor: 'pointer' },
  error: { color: 'red', marginTop: '1rem' }
};

export default AdminLoginPage;
