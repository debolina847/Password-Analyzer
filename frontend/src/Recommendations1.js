import React from 'react';

function Recommendations({ weaknesses = [] }) {  // default to an empty array
  return (
    <div style={{ marginTop: 16 }}>
      <h4>Recommendations:</h4>
      <ul>
        {weaknesses.length === 0 ? (
          <li>Password looks strong!</li>
        ) : (
          weaknesses.map((w, index) => <li key={index}>{w}</li>)
        )}
      </ul>
    </div>
  );
}

export default Recommendations;