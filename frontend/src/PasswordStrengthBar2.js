import React from 'react';

const colorMap = {
  Weak: '#e74c3c',
  Moderate: '#f39c12',
  Strong: '#27ae60',
};

function PasswordStrengthBar({ strength }) {
  const widthMap = {
    Weak: '33%',
    Moderate: '66%',
    Strong: '100%',
  };

  return (
    <div style={{
      marginTop: 16,
      height: 18,
      width: '100%',
      background: '#eee',
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      <div style={{
        width: widthMap[strength],
        height: '100%',
        background: colorMap[strength],
        transition: 'width 0.5s ease',
      }} />
    </div>
  );
}

export default PasswordStrengthBar;