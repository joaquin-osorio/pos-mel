/* ----------------------- IMPORTS ----------------------- */

const fire = require("./fire.js");
const axios = require("axios");

/* ----------------------- CONFIGURATIONS ----------------------- */

const renewHeaders = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };  

/* ----------------------- FUNCTIONS ----------------------- */

/**
 * renewToken is a function that returns a promise that, when resolved, returns the new access token received after refreshing the token.
 * It uses the firebase function getAuth() to get the client_id, client_secret and refresh_token that are necessary to make the request to the MercadoLibre API to get a new access token.
 * Once the new token is received, it updates the tokens on firebase using the pushAuth() function.
 */
const renewToken = () => {
  return new Promise((resolve, reject) => {
    // Get the client_id, client_secret, and refresh_token from firebase
    fire.getAuth().then((res) => {
      // Make a post request to the MercadoLibre API to get a new access token
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
        // Once the new token is received, update the tokens on firebase
        .then((res) => {
          fire.pushAuth({
            ACCESS_TOKEN: res.data.access_token,
            REFRESH_TOKEN: res.data.refresh_token,
          });
          // Resolve the promise with the new access token
          resolve(res.data.access_token);
        })
        .catch((error) => reject(error));
    });
  });
};

exports.renewToken = renewToken;