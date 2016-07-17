const mongodb = require('mongodb').MongoClient;

const mongoconfigs = {
  url: 'mongodb://localhost:27017/libraryApp',
  connect: (url, collection, callback) => mongodb.connect(url, (err, db) => {
    const col = db.collection(collection);
    callback(col);
  }),
};

module.exports = mongoconfigs;

