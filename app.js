require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.MY_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001"});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Send user message to Gemini AI
    const result = await model.generateContent(userMessage);
    const responseText = await result.response.text();
    res.json({ reply: responseText });

  } catch (error) {
    alert("Error:", error);
    res.status(500).json({ reply: "Sorry, an error occurred." });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
