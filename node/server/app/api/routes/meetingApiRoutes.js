'use strict';

module.exports = function (app) {
    const visitorCounter = require('../controllers/meetingApiController');
    const {BasicAuth} = require('../../middlewares/auth');
    const base = global.config.server.apiBasePath + '/visitors';

    app.route(base + '/:meeting')
        .get(BasicAuth, visitorCounter.getTotalMeeting)
        .patch(BasicAuth, visitorCounter.incrementVisitor)
        .delete(BasicAuth, visitorCounter.clear);
};
