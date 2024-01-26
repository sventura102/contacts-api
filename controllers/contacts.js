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

const getOne = async(req, res, next) => {
    const byId = new ObjectId(req.params.id);
    const one = await mongodb.getDb().db('sample_mflix').collection('contacts').find({_id: byId});
    one.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
}

const createContact = async(req, res, next) => {
  const contact = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').insertOne(contact);
  if (response.acknowledged) { res.status(201).json(response);
  } else {
    res.status(500).json(response.error); 
  }
};

const updateContact = async(req, res, next) => {
  const byId = new ObjectId(req.params.id);
  const contact = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').replaceOne({_id: byId}, contact);
  console.log(response);
  if (response) { res.status(204).json(response)
  } else {
    res.status(500).json(response.error);
  }
}

const deleteContact = async(req, res, next) => {
  const byId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('sample_mflix').collection('contacts').deleteOne({_id: byId}, true)
  if (response) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
};

module.exports = {getOne, getAll, createContact, updateContact, deleteContact};