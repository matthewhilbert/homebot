const axios = require('axios');

const hassApi = axios.create({
  baseURL: 'http://192.168.1.2:8123/api/',
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${process.env.HASS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

module.exports = hassApi;
