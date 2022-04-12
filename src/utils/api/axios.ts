import axios from "axios";
import config from "../../config";

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

/**
 * Updates the auth token to be used by the axios instance
 * @param token JWT provided by server
 */
export const setToken = (token: string): void => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default instance;
