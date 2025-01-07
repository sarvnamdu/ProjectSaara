const { OpenAI } = require('openai');

// Initialize OpenAI client with environment variable
const openai = new OpenAI({
apiKey: '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',
});

module.exports = openai;
