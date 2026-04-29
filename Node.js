import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post("/chat", async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const userMessage = req.body.message;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    const reply = data.choices?.[0]?.message?.content;

    res.json({ reply: reply || "No reply from AI" });

  } catch (err) {
    console.log("ERROR:", err);
    res.json({ reply: "Server error" });
  }
});
