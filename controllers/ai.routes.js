const router = require('express').Router();
const openai = require('../utils/openai');
const verifyToken = require('../middleware/verify-token');

router.post('/chat', verifyToken, async (req, res) => {
  try {
    const { messages, task } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
          You are a smart productivity assistant.

          Your job:
          - Convert tasks into steps
          - Modify steps based on user feedback
          - Keep answers short and practical

          Rules:
          - If user says "change step X" → modify only that step
          - If user says "simplify" → make steps easier
          - If user says "short" → reduce steps
          `
        },

    
        {
          role: "system",
          content: `
          Task: ${task?.title || ''}
          Description: ${task?.description || ''}
          `
        },

        ...messages
      ]
    });

    const reply = completion.choices[0].message;

    res.json(reply);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;