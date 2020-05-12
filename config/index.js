require("dotenv").config();

const config = {
  port: process.env.API_PORT,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  env: process.env.ENV,
  jwtsecret: process.env.JWT_SECRET,
};
module.exports = config;
