const express = require("express");
const config = require("./config.js");
const cors = require("cors");
const axios = require("axios");
const { type } = require("os");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const headers = { Authorization: `Bearer ${config.ACCESS_TOKEN}` };

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/getRanking", (req, res) => {
  axios
    .get("https://api.mercadolibre.com/highlights/MLA/category/MLA402916", {
      headers: headers,
    })
    .then((response) => {
      res.json(response.data);
    });
});

app.get("/getProducts", (req, res) => {
  axios
    .get(`https://api.mercadolibre.com/items/${req.query.param}`, {
      headers: headers,
    })
    .then((response) => {
      res.json(response.data);
    });
});

//CODE: TG-63c74c199f137f0001ea02f9-283317126

/*

{
    "access_token": "APP_USR-147682054087836-011721-45e443e30d33d0219a677896c6e5e55c-283317126",
    "token_type": "Bearer",
    "expires_in": 21600,
    "scope": "offline_access read",
    "user_id": 283317126,
    "refresh_token": "TG-63c74debf3db1c0001a176e2-283317126"
}

*/
