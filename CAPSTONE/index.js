import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "a0389253913f7dff31f82978cee200ec";
const API_URL = `https://superheroapi.com/api/${API_KEY}/`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const randomId = Math.floor(Math.random()*731) + 1;
  try {
    const result = await axios.get(API_URL + randomId);
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Api: https://fungenerators.com/api/facts/