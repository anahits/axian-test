const express = require('express');
const router = express.Router();
const passport = require('passport');
var i18n = require("i18n");


// index routes
router.get('/', (req, res) => {
    res.render('home', { title: 'Soluciones Empresariales SA de CV' });
});

// select lang ES
router.get('/es', (req, res) => {
    i18n.setLocale(req, 'es');
    res.render('home', { title: 'Soluciones Empresariales SA de CV' });
    res.end();
});

// select lang En
router.get('/en', (req, res) => {
    i18n.setLocale(req, 'en');
    res.render('home', { title: 'Soluciones Empresariales SA de CV' });
    res.end();
});

// select lang ES
router.post('/es', (req, res) => {
    i18n.setLocale(req, 'es');
    res.render('home', { title: 'Soluciones Empresariales SA de CV' });
    res.end();
});

// select lang En
router.post('/en', (req, res) => {
    i18n.setLocale(req, 'en');
    res.render('home', { title: 'Soluciones Empresariales SA de CV' });
    res.end();
});

//login view
router.get('/login', (req, res) => {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

// signup view
router.get('/signup', (req, res) => {
    res.render('signup', {
        message: req.flash('signupMessage')
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true // allow flash messages
}));

//profile view
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}