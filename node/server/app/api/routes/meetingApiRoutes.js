'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function (app) {
    const visitorCounter = require('../controllers/meetingApiController');
    const {BasicAuth} = require('../../middlewares/auth');
    const base = global.config.server.apiBasePath + '/visitors';

    app.route(base + '/:meeting')
        .get(cors(), bodyParser.json(), BasicAuth, visitorCounter.getTotalMeeting)
        .patch(cors(), bodyParser.json(), BasicAuth, visitorCounter.incrementVisitor)
        .delete(cors(), bodyParser.json(), BasicAuth, visitorCounter.clear);
};
