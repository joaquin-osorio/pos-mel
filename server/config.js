const dotenv = require('dotenv').config();

module.exports = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    APP_ID: process.env.APP_ID,
  }