const express = require('express');
const mongodb = require('mongodb').MongoClient;
const adminrouter = express.Router();

const router = (nav) => {
  adminrouter.route('/addBooks')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017/libraryApp';
  });

  return adminrouter;
};

module.exports = router;
