const express = require('express');
const mongodb = require('mongodb').MongoClient;
const authRouter = express.Router();

const authRoutes = (nav) => {
  authRouter.route('/signup')
    .post((req, res) => {
      console.log(req.body);
      req.login(req.body, () => res.redirect('/Auth/profile'));
    });

  authRouter.route('/profile')
   .get((req, res) => res.json(req.user));

  return authRouter;
};

module.exports = authRoutes;
