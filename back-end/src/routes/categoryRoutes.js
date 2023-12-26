'use strict';

const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

const { getCategories } = categoryController;
router.get('/categories', getCategories);

module.exports = {
    routes: router
}