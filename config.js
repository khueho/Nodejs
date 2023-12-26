"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
} = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";

// assert(PORT, "PORT is required");
// assert(HOST, "HOST is required");

module.exports = {
  port: PORT || "8080",
  host: HOST || "localhost",
  url: HOST_URL || "http://localhost:8080",
  sql: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true,
    },
  },
};
