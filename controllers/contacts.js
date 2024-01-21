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

module.exports = {getOne, getAll};