var i18n = require("i18n");

i18n.configure({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    directory: __dirname + '/locales',
    cookie: 'lang'
});

module.exports = function(req, res, next) {

    i18n.init(req, res);
    //  res.locals('__', res.__);
    res.locals.__ = i18n.__;
    let current_locale = i18n.getLocale();
    // console.log(current_locale);
    return next();
};