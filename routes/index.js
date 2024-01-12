const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.json('Stephanie Ventura');
});

module.exports = routes;