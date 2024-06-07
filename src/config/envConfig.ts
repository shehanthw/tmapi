import { config } from "dotenv";
config();

interface Config {
  PORT: string;
  MONGO_URL: string;
  SECRET_TOKEN: string;
  NODE_ENV: string;
}

const getConfig = (): Config => {
  const { PORT, MONGO_URL, SECRET_TOKEN, NODE_ENV } = process.env;

  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL environment variable");
  }

  return {
    PORT: PORT || "8000",
    MONGO_URL,
    SECRET_TOKEN: SECRET_TOKEN!,
    NODE_ENV: NODE_ENV!,
  };
};

const envConfigs = getConfig();

export default envConfigs;
