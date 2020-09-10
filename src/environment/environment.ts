if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

interface Environment {
  APP_PORT: string | any,
  DB_USER: string | any,
  DB_PASSWORD: string | any,
  DB_HOST: string | any,
  DB_PORT: string | any,
  DB_NAME: string | any,
  DATA_SECRET_KEY: string | any,
  JWT_SECRET_KEY: string | any,
  JWT_TOKEN_EXPIRE: string | any,
  JWT_REFRESH_TOKEN_EXPIRE: string | any
  MAILER_HOST: string | any,
  MAILER_USER: string | any,
  MAILER_PASSWORD: string | any,
  MAILER_REGISTER_SENDER: string | any;
  MAILER_REGISTER_NAME: string | any;
  MAILER_REGISTER_URL: string | any,
  PASSWORD_SALT_ROUND: string | any,
}

export const Environment: Environment = {
  APP_PORT: process.env.APP_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DATA_SECRET_KEY: process.env.SECRET_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE,
  JWT_REFRESH_TOKEN_EXPIRE: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_USER: process.env.MAILER_USER,
  MAILER_PASSWORD: process.env.MAILER_PASSWORD,
  MAILER_REGISTER_SENDER: process.env.MAILER_REGISTER_SENDER,
  MAILER_REGISTER_NAME: process.env.MAILER_REGISTER_NAME,
  MAILER_REGISTER_URL: process.env.MAILER_REGISTER_URL,
  PASSWORD_SALT_ROUND: process.env.PASSWORD_SALT_ROUND
};
