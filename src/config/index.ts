const isDevEnv = process.env.NODE_ENV === "development";
const isTestEnv = process.env.NODE_ENV === "test";

const isProdEnv = !isDevEnv && !isTestEnv;

if (!isProdEnv) {
  const dotenv = require("dotenv");
  console.log("Loading config from .env");
  dotenv.config({ path: "src/config/.env" });
}

const config = {
  isDevEnv,
  isTestEnv,
  isProdEnv,

  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:5000",
};

export default config;
