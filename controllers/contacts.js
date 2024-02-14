const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const all = mongodb.getDb().db('sample_mflix').collection('contacts').find();
    all.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const getOne = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json('Must use a valid contact id to find contact.');
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createContact = async(req, res, next) => {
  const contact = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').insertOne(contact);
  if (response.acknowledged) { res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the contact. Please try again.'); 
  }
};

const updateContact = async(req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const byId = new ObjectId(req.params.id);
  const contact = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').replaceOne({_id: byId}, contact);
  console.log(response);
  if (response.modifiedCount > 0)
  { res.status(204).send(response)} 
  else {
    res.status(500).json(response.error || 'There was an error while updating this contact. Please try again.');
  }
}

const deleteContact = async(req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const byId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').deleteOne({_id: byId}, true)
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'There was an error while deleting this contact. Please try again.');
  }
};

module.exports = {getOne, getAll, createContact, updateContact, deleteContact};