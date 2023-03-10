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

app.get('/getAuth', (req, res) => {
  fire.getAuth().then((response) => {
    res.send(response)
  })
})


renewToken().then((res) => (ACCESS_TOKEN = res));
setInterval(() => {
  renewToken().then((res) => (ACCESS_TOKEN = res));
}, 14400000);

app.get("/getRanking", (req, res) => {
  const { param, attribute, attributeValue, save } = req.query;
  axios
    .get(
      `https://api.mercadolibre.com/highlights/MLA/category/${attributeValue ? `${param}?attribute=BRAND&attributeValue=${attributeValue}` : `${param}`}`,
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
        if(save){
          fire.addReg(results, param, attributeValue)
        }
        res.json(results)
      });
    });
});

app.get('/getCat', (req, res) => {
  fire.getCategories()
  .then(response => response.data)
  .then(data => res.json(data))
})

app.get('/getHistory', (req, res) => {
  const { param, attributeValue } = req.query
  fire.getHistory(param, attributeValue)
  .then(data => res.json(data))
})