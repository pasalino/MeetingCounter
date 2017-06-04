'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = {
    HeaderMiddleware: function (app) {
        //Header
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(cors());
    },

    FooterMiddleware: function (app) {
        app.use(function (req, res) {
            const conttype = req.headers['content-type'];

            res.status(404);
            if (req.accepts('json') && conttype && conttype.indexOf('application/json') === 0) {
                res.send({error: true, message: 'Error 404 Not found'});
                return;
            }

            // respond with html page
            if (req.accepts('html')) {
                res.render('common/404', {url: req.url});
                return;
            }


            // default to plain-text. send()
            res.type('txt').send('Resource Not found');
        });

        app.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = global.env === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('common/500');
        });
    },

};
