
module.exports = (app) => {
    const express = require('express');
    const staticAsset = require('static-asset');

    //Used only in dev mode
    if ('production' !== app.get('env')) {
        app.use(staticAsset(config.server.publicAsset));
        app.use(express.static(config.server.publicAsset));
    }
}
