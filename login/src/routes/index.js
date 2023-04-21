const express = require('express');

const controller = require('../controllers');

const routes = express.Router();

routes.post('/register', controller.register);
routes.post('/login', controller.login);
routes.get('/users', controller.getUsers);

module.exports = routes;