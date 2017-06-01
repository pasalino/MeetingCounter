'use strict';

module.exports = {
    HeaderMiddleware: function (app) {

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
                res.render('404', {url: req.url});
                return;
            }

            // default to plain-text. send()
            res.type('txt').send('Resource Not found');
        });

        app.use(function (err, req, res) {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    },
};
