import axios from "axios";
import config from "src/config";

const PREFIX = "/api/v1";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: `${config.baseUrl}${PREFIX}`,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});

export default instance;
