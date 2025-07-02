import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "fernandoldalpiaz";
const yourPassword = "programming";
const yourAPIKey = "6468b08b-7869-4ae7-8463-37e3013549d5";
const yourBearerToken = "e7dff4d9-bc55-4ba2-bb3d-fc38e8292aca";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.status(500).send("Failed to fetch activity. Please try again");
  }
  });

app.get("/basicAuth", async(req, res) => {
    try {
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
        auth: {
            username: yourUsername,
            password: yourPassword
        },
    });
      res.render("index.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
      console.error("Failed to make request: ", error.message);
      res.status(500).send("Failed to fetch activity. Please try again");
    }
});

app.get("/apiKey", async(req, res) => {
  try {
    const score = 8;
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=${score}&apiKey=${yourAPIKey}`);
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.status(500).send("Failed to fetch activity. Please try again");
  }
});

app.get("/bearerToken", async(req, res) => {
  try {
    const id = 42;
    const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {
      headers: {
          Authorization: `Bearer ${yourBearerToken}`
      },
  });
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.status(500).send("Failed to fetch activity. Please try again");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
