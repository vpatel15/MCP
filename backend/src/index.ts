import "dotenv/config";
import cors from "cors";
import express from "express";
import { processMessage } from "./agent.js";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/chat", async (req, res) => {
  console.log("Received message:", req.body.message);
  try {
    const message = req.body.message;

    const response = await processMessage(message);

    res.json({
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});