const express = require('express');

const controller = require('../controllers');

const routes = express.Router();

routes.get('/users', controller.getUsers);

module.exports = routes;