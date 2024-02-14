const express = require('express');
const routes = express.Router();
const contactsController = require('../controllers/contacts');
const validation = require('../middlewear/validate');


routes.get('/', contactsController.getAll);
routes.get('/:id', contactsController.getOne);

routes.post('/', contactsController.createContact);

routes.post('/', validation.saveContact, contactsController.createContact);

routes.put('/:id', validation.saveContact, contactsController.updateContact);

module.exports = routes;