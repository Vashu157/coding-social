import express from "express"
import cors from "cors"
import fetchLeetcode from "./profileFetch.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/leetcode/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const data = await fetchLeetcode(username);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});