const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: userMessage }
      ],
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.json({ reply: "Groq backend error." });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Groq AI server running on port ${PORT}`);
});
