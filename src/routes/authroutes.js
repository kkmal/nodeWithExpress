const express = require('express');
const mongodb = require('mongodb').MongoClient;
const mongoconfig = require('../../src/config/mongoconfig');
const authRouter = express.Router();
const User = require('../model/user');
const passport = require('passport');

const authRoutes = (nav) => {
  authRouter.route('/signup')
    .post((req, res) => {
      mongodb.connect(mongoconfig.url, (err, db) => {
        const collection = db.collection('users');
        collection.insert(new User(req.body.userName, req.body.password), (err, results) => {
          req.login(results.ops[0], () => res.redirect('/Auth/profile'));
        });
      });
    });

  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      failureRedirect: '/',
    }), (req, res) => res.redirect('/auth/profile'));

  authRouter.route('/profile')
   .get((req, res) => res.json(req.user));

  return authRouter;
};

module.exports = authRoutes;
