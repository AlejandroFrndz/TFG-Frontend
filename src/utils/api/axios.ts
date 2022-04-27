import axios from "axios";
import config from "src/config";
import https from "https";

const PREFIX = "/api/v1";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: `${config.baseUrl}${PREFIX}`,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Accept self signed backend certificate
});

export default instance;
