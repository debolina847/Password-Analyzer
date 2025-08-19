// PasswordForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PasswordForm({ setResult }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5000/analyze',
        { password });
      console.log("Backend strength value:",data);
      setResult(data);
    } catch (error) {
      console.error('Error analyzing password:', error);
      setErr('Could not analyze password. Is the backend running on :5000?');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        required
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Analyzing…' : 'Analyze'}
      </button>
      {err && (
        <div style={{ marginTop: 8, color: '#c00', fontSize: 14 }}>{err}</div>
      )}
    </form>
  );
}

export default PasswordForm;   