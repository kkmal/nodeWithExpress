const express = require('express');
const bookRouter = express.Router();
const mongoconfig = require('../../src/config/mongoconfig');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

module.exports = (nav) => {
  bookRouter.route('/')
    .get((req, res) => {
      mongodb.connect(mongoconfig.url, (err, db) => {
        const collection = db.collection('books');
        collection.find().toArray((err, results) => {
          res.render('bookList', {
            title: 'Books',
            nav,
            books: results,
          });
        });
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const id = new ObjectId(req.params.id);
      mongodb.connect(mongoconfig.url, (err, db) => {
        const collection = db.collection('books');
        collection.findOne({
          _id: id,
        }, (err, result) => {
          res.render('bookView', {
            title: 'Book',
            nav,
            book: result,
          });
        });
      });
    });

  return bookRouter;
};
