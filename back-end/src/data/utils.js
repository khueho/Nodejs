"use strict";

const fs = require("fs-extra");
const { join } = require("path");

const loadSqlQueris = async (folderName) => {
  const filePath = join(process.cwd(), "back-end/src/data", folderName);
  const file = await fs.readdir(filePath);
  const sqlFiles = await file.filter((f) => f.endsWith(".sql"));
  const queries = {};

  for (const sqlFile of sqlFiles) {
    const query = await fs.readFileSync(join(filePath, sqlFile), {
      encoding: "UTF-8",
    });
    queries[sqlFile.replace(".sql", "")] = query;
  }

  return queries;
};

module.exports = {
  loadSqlQueris,
};
