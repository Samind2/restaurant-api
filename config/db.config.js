require("dotenv").config();

module.exports = {
  HOST: "ep-gentle-bar-a11v5ltt-pooler.ap-southeast-1.aws.neon.tech",
  USER: "default",
  PASSWORD: "5iMSa3hfRlGq",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};