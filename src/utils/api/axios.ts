import axios from "axios";
import config from "../../config";

const PREFIX = "/api/v1";

const instance = axios.create({
  baseURL: `${config.baseUrl}${PREFIX}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default instance;
