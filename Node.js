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
