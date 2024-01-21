const express = require('express');
const routes = express.Router();
const controller = require('../controllers');

routes.use('/contacts', require('./contacts'))

routes.get('/', controller.me);
routes.get('/fav', controller.favoritePerson);
routes.get('/mom', controller.motherlyPerson);

module.exports = routes;