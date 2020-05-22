const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var i18n = require('./app/config/i18n');

// initialization
require('./app/config/database');
require('./app/config/passport');

// settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

// middlewares
app.use(i18n);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// required for passport
app.use(session({
    secret: 'faztwebtutorialexample',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.use(require('./app/routes/router'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});