const express = require('express');
const router = express.Router();
const { analyzePassword } = require('./passwordUtils');

router.post('/analyze-password', (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: 'Password is required' });

  const result = analyzePassword(password);
  res.json(result);
});

module.exports = router;