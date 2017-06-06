module.exports = (app) => {
    const express = require('express');
    const staticAsset = require('static-asset');
    const favicon = require('serve-favicon');

    //Common assets
    app.use('/jquery', express.static('../../node_modules/jquery/dist/'));
    app.use('/bootstrap', express.static('../../node_modules/bootstrap/dist/'));

    //Favicon
    app.use(favicon(`${config.server.publicAsset}/img/favicon.png`));


    //Public assets
    app.use(staticAsset(global.config.server.publicAsset));
    app.use(express.static(global.config.server.publicAsset));


    //Css Preprocessor
    sassConfigure(app);
};

const sassConfigure = (app) => {
    const sassMiddleware = require('node-sass-middleware');

    const srcSassPath = './sass';
    const destSassPath = './public/styles';

    let sassConfig = {};
    if (global.env === 'production') {
        sassConfig = {
            src: srcSassPath,
            dest: destSassPath,
            debug: false,
            response: false,
            outputStyle: 'compressed',
            prefix: '/styles',
            sourceMap: true
        };
    } else {
        sassConfig = {
            src: srcSassPath,
            dest: destSassPath,
            debug: true,
            response: true,
            outputStyle: 'extended',
            prefix: '/styles',
        };
    }

    //Sass
    app.use(
        sassMiddleware(sassConfig)
    );
};