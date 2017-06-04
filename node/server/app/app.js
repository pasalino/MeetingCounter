const http = require('http');
const express = require('express');

const Logger = require('./middlewares/logs');
const {HeaderMiddleware, FooterMiddleware} = require('./middlewares/express');
const Static = require('./middlewares/staticAsset');
const ViewsEngine = require('./middlewares/viewsEngine');

const {ServerSocket} = require('./appSocket');

const MeetingApi = require('./api/routes/meetingApiRoutes');
const Meeting = require('./routes/meetingRoutes');

global.env = process.env.NODE_ENV || 'development';
global.config = require(__dirname + '/config.json')[global.env];
const port = process.env.PORT || config.server.defaultPort || 3000;
const app = express();
const server = http.createServer(app);

app.set('port', port);

//View Engine
ViewsEngine(app);

//Logger
Logger(app);

//Middleware
HeaderMiddleware(app);

//Static asset
Static(app);

//Api
MeetingApi(app);

//Apps
Meeting(app);

//Middleware
FooterMiddleware(app);

server.listen(port);

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
};

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


ServerSocket(server);

server.on('error', onError);
server.on('listening', onListening);
