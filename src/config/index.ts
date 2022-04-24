const isDevEnv = process.env.NODE_ENV === "development";
const isTestEnv = process.env.NODE_ENV === "test";

const isProdEnv = !isDevEnv && !isTestEnv;

const config = {
  isDevEnv,
  isTestEnv,
  isProdEnv,

  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:5000",
};

export default config;
