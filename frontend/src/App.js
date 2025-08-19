import React, { useState } from 'react';
import PasswordForm from './PasswordFrom';
import PasswordStrengthBar from './PasswordStrengthBar2';
import Recommendations from './Recommendations1';

function App() {
const [result, setResult] = useState(null);

const getStrengthText = (score) => {
if (score <= 1) return 'Weak';
if (score <= 3) return 'Moderate';
return 'Strong';
};

return (
<div style={{ maxWidth: 500, margin: '0 auto', padding: '1rem' }}>
<h2>Password Analyzer</h2>
<PasswordForm setResult={setResult} />
{result && (
<>
<PasswordStrengthBar strength={getStrengthText(result.strength)} />
<p style={{ marginTop: '8px', fontWeight: 'bold' }}>
Estimated Time to Crack: <span style={{ color: '#555' }}>{result.timeToCrack}</span>
</p>
<Recommendations weaknesses={result.weaknesses} />
</>
)}
</div>
);
}

export default App;
