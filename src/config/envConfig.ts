import { config } from "dotenv";
config();

interface Config {
  PORT: string;
  MONGO_URL: string;
  SECRET_TOKEN: string;
}

const getConfig = (): Config => {
  const { PORT, MONGO_URL, SECRET_TOKEN } = process.env;

  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL environment variable");
  }

  return {
    PORT: PORT || "8000",
    MONGO_URL,
    SECRET_TOKEN: SECRET_TOKEN!,
  };
};

const envConfigs = getConfig();

export default envConfigs;
