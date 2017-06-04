'use strict';
const model = require('../models/visitorCounterModel');
const views = "meeting";

module.exports = {
    meetingList: async (req, res, next) => {
        try {
            const list = await model.getMeetingList();
            const context = {list};
            res.render(`${views}/list`, context);
            res.json(response);
        } catch (err) {
            next(err);
        }
    },

    meetingDetails: async (req, res, next) => {
        try {
            const meetingParam = req.params.meeting;
            const meeting = await model.getTotalVisitorsInMeeting(meetingParam);
            const context = {meeting: meetingParam, visitors: meeting};
            res.render(`${views}/details`, context);
        } catch (err) {
            next(err);
        }
    },
};
