const axios = require("axios");

const instance = axios.create({
  baseURL: "//localhost:5000/api",
});

export default instance;
