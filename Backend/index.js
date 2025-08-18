// backend/index.js

const express = require('express');
const cors = require('cors');

const { analyzePassword } = require('./passwordUtils'); // Assuming you have a file with this function

const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
  const { password } = req.body;
  const result = analyzePassword(password);
  res.json(result);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
