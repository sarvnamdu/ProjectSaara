// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // To handle CORS
const openai = require('./openaiClient'); // Import OpenAI client

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.static('public')); // Serve static files from the 'public' directory

// POST route to handle user queries
app.post('/ask', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }]
    });

    // Extract and send the response back
    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Error handler middleware for better debugging
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
