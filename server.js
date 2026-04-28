import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

// serve frontend
app.use(express.static("./"));

// 🔥 clean function (remove symbols)
function cleanText(text) {
  return text
    .replace(/[*_`~/#\\-]/g, "")   // remove unwanted symbols
    .replace(/\s+/g, " ")          // extra spaces fix
    .trim();
}

// API route
app.get("/api", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) return res.send("No prompt provided");

  try {
    // 🌍 Pollinations AI request
    const response = await fetch(
      `${BASE_URL}/${encodeURIComponent(prompt)}`
    );

    const text = await response.text();

    // clean response
    const clean = cleanText(text);

    res.send(clean);

  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
