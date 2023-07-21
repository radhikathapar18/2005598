const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

const requestTimeout = 500; // Set the desired response time in milliseconds

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8008;

app.use(cors());

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;
  // console.log(urls);

  if (!urls) return res.status(400).json({ error: "Invalid URL" });

  try {
    const promises = urls.map(async (url) => {
      const response = await axios.get(url, { timeout: requestTimeout });
      return response.data.numbers;
    });

    const numbersArray = await Promise.all(promises);
    // console.log(numbersArray);
    // debugger
    const flattenedArray = [...new Set(numbersArray.flat())];
    flattenedArray.sort((a, b) => a - b);

    res.json({ numbers: flattenedArray });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});