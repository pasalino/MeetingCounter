//Created by pasalino on 22/05/17.

'use strict';

module.exports = (app) => {
    //Views
    let pugConfig = {};
    let pugCached = false;
    let prettyOutput = true;

    if (global.env === 'production') {
        pugConfig = {debug: false};
        pugCached = true;
        prettyOutput = false;
    } else {
        pugConfig = {debug: true};
        app.locals.pretty = true;
        prettyOutput = true;
    }

    app.set('view engine', 'pug');
    app.set('views', './views');
    app.set('view options', pugConfig);
    app.set('view cache', pugCached);
    app.locals.pretty = prettyOutput;

};

