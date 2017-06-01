'use strict';

module.exports = function (app) {
    const fs = require('fs');
    const morgan = require('morgan');

    if (app.get('env') === 'production') {
        app.use(morgan('common', {
            skip: function (req, res, next) {
                return res.statusCode < 400
            },
            stream: fs.createWriteStream('./logs/app.log', {flags: 'a'})
        }));
    } else {
        app.use(morgan('dev'));
    }
};


