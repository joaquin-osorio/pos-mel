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
    .then((response) => response.data.content)
    .then((content) => {
      const fetchPromises = content.map((element) => {
        return axios
          .get(`https://api.mercadolibre.com/items/${element.id}`, {
            headers: headers,
          })
          .then((response) => {
            return {
              id: response.data.id,
              position: element.position,
              title: response.data.title,
              seller: response.data.seller_id,
            };
          });
      });
      Promise.all(fetchPromises).then((results) => res.json(results));
    });
});