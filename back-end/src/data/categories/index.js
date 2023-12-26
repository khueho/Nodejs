"use strict";

const utils = require("../utils");
const config = require("../../../../config");
const sql = require("mssql");

const getCategories = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueris("categories");
    const list = await pool.request().query("select * from Category");

    return list.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getCategories,
};
