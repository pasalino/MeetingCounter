const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mustacheExpress = require('mustache-express');

const Logger = require('./middlewares/logs');
const {HeaderMiddleware, FooterMiddleware} = require("./middlewares/express");
const Static = require("./middlewares/staticAsset");

const RoutesCounter = require('./api/routes/visitorCounterRoutes');

const env = process.env.NODE_ENV || 'development';
global.config = require(__dirname + '/config.json')[env];

const port = process.env.PORT || config.server.defaultPort || 3000;
const app = express();

//Header
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

//Logger
Logger(app);

//Middleware
HeaderMiddleware(app);

//Static asset
Static(app);

//Apps
RoutesCounter(app);

//Middleware
FooterMiddleware(app);

app.listen(port);
console.log('Server start on port: ' + port);