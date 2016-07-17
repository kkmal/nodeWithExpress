const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('../mongoconfig');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
  },
    (username, password, done) => {
      mongo.connect(mongo.url, 'users', (col) => {
        col.findOne({
          username,
        },
            (err, results) => {
              if (results != null) {
                if (results.password === password) {
                  done(null, results);
                } else {
                  done(null, false);
                }
              } else {
                done(null, false);
              }
            }

        );
      });
    }));
};
