// @flow

type Config = {
  version: string,
  port: number,
  env: string,
  mongoUri: string,
  jwtSecret: string,
  jwtIssuer: string,
  saltRounds: number,
};

const config: Config = {
  version: String(process.env.npm_package_version),
  port: Number(process.env.PORT),
  env: String(process.env.NODE_ENV),
  mongoUri: String(process.env.MONGO_DB_URI),
  jwtSecret: 's3cre7',
  jwtIssuer: 'rest-api',
  saltRounds: 10,
};

export default config;
