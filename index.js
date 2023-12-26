"use strict";

const express = require("express");
const path = require("path");
const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoryRoutes = require("./back-end/src/routes/categoryRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", categoryRoutes.routes);

app.use(express.static(path.join(__dirname, "front-end", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
});

app.listen(config.port, () =>
  console.log("Server is listening on http://localhost: " + config.port)
);
