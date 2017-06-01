//Created by pasalino on 22/05/17.

'use strict';

module.exports = {
    BasicAuth: (req, res, next) => {
        if (!process.env.USER) return next();
        const basicAuth = require('basic-auth');

        const user = basicAuth(req);

        if (!user || !user.name || !user.pass) return unauthorized(res);

        const conf = global.config.basicAuth;
        if (user.name === conf.username && user.pass === conf.password) return next();

        return unauthorized(res);
    },
};

function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    res.end();
    return res;
}

