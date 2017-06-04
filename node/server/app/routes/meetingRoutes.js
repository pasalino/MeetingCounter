'use strict';

module.exports = function (app) {
    const controller = require('../controllers/meetingController');
    const base = '/meetings';

    app.route(base + '/').all(controller.meetingList);
    app.route(base + '/:meeting').get(controller.meetingDetails);
};
