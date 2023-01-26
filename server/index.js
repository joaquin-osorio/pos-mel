const express = require("express");
const config = require("./config.js");
const cors = require("cors");
const axios = require("axios");
const fire = require("./fire.js");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

let ACCESS_TOKEN = "";

const renewHeaders = {
  accept: "application/json",
  "content-type": "application/x-www-form-urlencoded",
};

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const renewToken = () => {
  return new Promise((resolve, reject) => {
    fire.getAuth().then((res) => {
      axios
        .post(
          "https://api.mercadolibre.com/oauth/token",
          {
            grant_type: "refresh_token",
            client_id: res.APP_ID,
            client_secret: res.CLIENT_SECRET,
            refresh_token: res.REFRESH_TOKEN,
          },
          {
            headers: renewHeaders,
          }
        )
        .then((res) => {
          fire.pushAuth({
            ACCESS_TOKEN: res.data.access_token,
            REFRESH_TOKEN: res.data.refresh_token,
          });
          resolve(res.data.access_token);
        })
        .catch((error) => reject(error));
    });
  });
};

renewToken().then((res) => (ACCESS_TOKEN = res));
setInterval(() => {
  renewToken().then((res) => (ACCESS_TOKEN = res));
}, 14400000);

app.get("/getRanking", (req, res) => {
  const { param, attribute, attributeValue } = req.query;
  axios
    .get(
      `https://api.mercadolibre.com/highlights/MLA/category/${attributeValue ? `${param}?attribute=BRAND&attributeValue=${attributeValue}` : `${param}`}`,
      //`https://api.mercadolibre.com/highlights/MLA/category/${param}?attribute=BRAND&attributeValue=${attributeValue}`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    )
    .then((response) => response.data.content)
    .then((content) => {
      const fetchPromises = content.map((element) => {
        if (element.type === "ITEM") {
          return axios
            .get(`https://api.mercadolibre.com/items/${element.id}`, {
              headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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
              headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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

app.get('/saveRanking', (req, res) => {
  const { category } = req.query

  axios
  .get(
    `https://api.mercadolibre.com/highlights/MLA/category/MLA402916`,
    {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }
  )
  .then((response) => response.data.content)
  .then((content) => {
    const fetchPromises = content.map((element) => {
      if (element.type === "ITEM") {
        return axios
          .get(`https://api.mercadolibre.com/items/${element.id}`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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
    Promise.all(fetchPromises).then((results) => {
      fire.addReg(results)
      res.json(results)
    });
  });

})
