const express = require("express");
const config = require("./config.js");
const cors = require("cors");
const axios = require("axios");
const { type } = require("os");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const headers = { Authorization: `Bearer ${config.ACCESS_TOKEN}` };
const renewHeaders = {
  accept: "application/json",
  "content-type": "application/x-www-form-urlencoded",
};

app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const renewToken = () => {
  axios
    .post(
      "https://api.mercadolibre.com/oauth/token",
      {
        grant_type: "refresh_token",
        client_id: config.APP_ID,
        client_secret: config.CLIENT_SECRET,
        refresh_token: config.REFRESH_TOKEN,
      },
      {
        headers: renewHeaders,
      }
    )
    .then((response) => {
      config.ACCESS_TOKEN = response.data.access_token;
      config.REFRESH_TOKEN = response.data.refresh_token;
      console.log("Access token renewed");
      console.log("Access token: " + response.data.access_token);
      console.log("Refresh token: " + response.data.refresh_token);
    })
    .catch((error) => console.error(error));
};

renewToken();
setInterval(renewToken, 14400000);

app.get('/test', (req, res) => {
  axios
    .get('https://api.mercadolibre.com/products/MLA16121139', {
      headers: headers,
    })
    .then(response => {res.json(response.data)})
})

app.get("/getRanking", (req, res) => {
  axios
    .get(
      `https://api.mercadolibre.com/highlights/MLA/category/${req.query.param}`,
      {
        headers: headers,
      }
    )
    .then((response) => response.data.content)
    .then((content) => {
      const fetchPromises = content.map((element) => {
        if (element.type === "ITEM") {
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
        } else if (element.type === "PRODUCT") {
          return axios
            .get(`https://api.mercadolibre.com/products/${element.id}`, {
              headers: headers,
            })
            .then((response) => {
              return {
                id: element.id,
                position: element.position,
                title: response.data.name,
                seller: response.data.buy_box_winner.seller_id,
              };
            });
        }
      });
      Promise.all(fetchPromises).then((results) => res.json(results));
    });
});
