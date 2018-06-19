// @flow

type Config = {
  version: string,
  port: number,
  env: string,
  mongoUri: string,
};

const config: Config = {
  version: String(process.env.npm_package_version),
  port: Number(process.env.PORT),
  env: String(process.env.NODE_ENV),
  mongoUri: String(process.env.MONGO_DB_URI),
};

export default config;
