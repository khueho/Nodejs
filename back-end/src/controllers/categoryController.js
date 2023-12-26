"use strict";

const categoryData = require("../data/categories");

const getCategories = async (req, res, next) => {
  try {
    const category = await categoryData.getCategories();
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getCategories,
};
