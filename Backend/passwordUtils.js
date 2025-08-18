// backend/passwordUtils.js

const patterns = [
  { regex: /[A-Z]/, score: 1, message: "Add uppercase letters." },
  { regex: /[a-z]/, score: 1, message: "Add lowercase letters." },
  { regex: /\d/, score: 1, message: "Add numbers." },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, score: 1, message: "Add special characters." }
];

const commonWords = [
  'password', 'admin', 'welcome', 'qwerty', 'letmein', '123456', '111111', 'abc123', 'iloveyou', '12345678', '2444666668888888', '1234567890'
];

const recommendationsBase = [
  "Use at least 9 characters.",
  "Combine uppercase, lowercase, numbers, and symbols.",
  "Avoid common words and repeated characters.",
  "Dont use personal information (like names or birthdays).",
  "Change passwords regularly.",
  "Don't reuse passwords across accounts.",
  "Use a password manager for secure storage."
];

const estimateCrackTime = (pwd) => {
  const charsets = [
    { regex: /[a-z]/, size: 26 },
    { regex: /[A-Z]/, size: 26 },
    { regex: /\d/, size: 10 },
    { regex: /[!@#$%^&*(),~.?":{}|<>]/, size: 32 }
  ];
  const charsetSize = charsets
    .filter(cs => cs.regex.test(pwd))
    .map(cs => cs.size)
    .reduce((a, b) => a + b, 0);

  const length = pwd.length;
  const combinations = Math.pow(charsetSize || 1, length);
  const guessesPerSecond = 1e10; // Fast offline attack
  const seconds = combinations / guessesPerSecond;

  const units = [
    { label: 'years', value: 60 * 60 * 24 * 365 },
    { label: 'days', value: 60 * 60 * 24 },
    { label: 'hours', value: 60 * 60 },
    { label: 'minutes', value: 60 },
    { label: 'seconds', value: 1 },
    { label: 'miliseconds', value: 0.001 },
    { label: 'microseconds', value: 0.000001 }
  ];

  const match = units.find(u => seconds >= u.value);
  return match
    ? `${Math.floor(seconds / match.value)} ${match.label}`
    : 'less than a minute';
};

const analyzePassword = (pwd) => {
  const password = pwd || "";

  const lengthScore = Math.min(2, Math.floor(password.length / 8));
  const patternResults = patterns.map(pattern => ({
    matched: pattern.regex.test(password),
    message: pattern.message
  }));

  const patternScore = patternResults.filter(res => res.matched).length;

  const weaknesses = [
    ...patternResults.filter(res => !res.matched).map(res => res.message),
    ...(commonWords.some(word => password.toLowerCase().includes(word)) ? ["Avoid common words."] : []),
    ...(/(.)\1{2,}/.test(password) ? ["Avoid repeating characters."] : []),
    ...(password.length < 8 ? ["Increase length to at least 12."] : [])
  ];

  const recommendations = [
    ...recommendationsBase.filter(rec =>
      weaknesses.some(w => rec.toLowerCase().includes(w.replace(/\.$/, '').toLowerCase()))
    ),
    ...(!patternResults.every(res => res.matched) ? ["Mix more types of characters."] : []),
    ...(!password.length ? ["Enter a password to analyze."] : [])
  ];

  const strengthMap = ["Weak", "Moderate", "Strong"];
  const totalScore = lengthScore + patternScore;
  const strength = strengthMap[Math.min(totalScore, strengthMap.length - 1)];

  const timeToCrack = estimateCrackTime(password);

  const charsets = [
    { regex: /[a-z]/, size: 26 },
    { regex: /[A-Z]/, size: 26 },
    { regex: /\d/, size: 10 },
    { regex: /[!@#$%^&*(),~.?":{}|<>]/, size: 32 }
  ];
  const charsetSize = charsets.filter(cs => cs.regex.test(password)).map(cs => cs.size).reduce((a, b) => a + b, 0) || 1;
  const entropy = (password.length * Math.log2(charsetSize)).toFixed(2);

  return {
    strength,
    weaknesses,
    recommendations: recommendations.length ? recommendations : ["Good job! Your password looks strong."],
    timeToCrack,
    entropy: `${entropy} bits`
  };
};

// ✅ Correct export (no duplicate, correct function name)
module.exports = { analyzePassword, estimateCrackTime };     //for further us