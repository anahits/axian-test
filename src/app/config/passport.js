const LocalStrategy = require('passport-local').Strategy; //auth methods
const User = require('../models/user');
const passport = require('passport');
//const mongoose = require('mongoose');
const conn = require('./database');

// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Signup
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
        User.findOne({ email }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'the email is already taken'));
            } else {
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) { throw err; }
                    return done(null, newUser);
                });
            }
        });
    }));

// login
// we are using named strategies since we have one for login and one for signup
passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
        User.findOne({ email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No User found'))
            }
            if (!user.validPassword(user, password)) {
                return done(null, false, req.flash('loginMessage', 'Wrong. password'));
            }
            return done(null, user);
        });
    }));


module.exports = passport;