const WebSocketServer = require('websocket').server;
const {Promise} = require('bluebird');
const model = require('./models/visitorCounterModel');

const connections = {};

exports.SendUpdate = async (meeting) => {
    try {
        if (!(meeting in connections)) return;
        const visitors = await model.getTotalVisitorsInMeeting(meeting);
        Promise.filter(connections[meeting], (wsItem) => {
            if (wsItem.ws.status !== wsItem.ws.CLOSED) {
                wsItem.ws.send(JSON.stringify({command: "update", meeting, visitors}));
                return true;
            }
        })

    } catch (err) {
        throw err;
    }
};

exports.ServerSocket = (server) => {
    const wsServer = new WebSocketServer({
        httpServer: server,
    });


    wsServer.on('request', async (request) => {
        try {
            const ws = request.accept(null, request.origin);

            const parameters = request.resource.split('/').slice(-2);
            const meeting = decodeURI(parameters[0]);
            const guid = decodeURI(parameters[1]);

            if (!(meeting in connections)) {
                connections[meeting] = [];
            }
            connections[meeting].push({id: guid, ws});

            //Send message ping pong when client send any message
            ws.on('message', (message) => {
                if (message.type === 'utf8') {
                    ws.send(JSON.stringify({command: "ping", message: "Ping-Pong!!! " + message.utf8Data}));
                }
            });

            //On Closing Websocket
            ws.on('close', () => {
                console.log(connections);
                connections[meeting] = connections[meeting].filter((socket) => {
                    return socket.id !== guid;
                });
                console.log(connections);
                console.log("close");
            });

            const visitors = await model.getTotalVisitorsInMeeting(meeting);
            ws.send(JSON.stringify({command: "update", meeting, visitors}));
        } catch (err) {
            console.log('ddd');
            throw err;
        }
    });
};
