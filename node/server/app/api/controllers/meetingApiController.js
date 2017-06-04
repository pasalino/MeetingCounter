'use strict';
const model = require('../../models/visitorCounterModel');
const {SendUpdate} =require('../../appSocket');
const {Promise} = require('bluebird');
module.exports = {
    incrementVisitor:  async (req, res) => {
        const meeting = req.params.meeting;
        console.log(`Increment meeting: ${meeting}`);
        try {
            await model.increment(meeting);
            const response = {status: 200, success: 'Increment Successfully'};
            await SendUpdate(meeting);
            res.status(response.status);
            res.json(response);
        } catch (err) {
            const response = {status: 500, error: err};
            res.status(response.status);
            res.json(response);
        }
    },

    getTotalMeeting: async (req, res) => {
        const meeting = req.params.meeting;
        try {
            const result = await model.getTotalVisitorsInMeeting(meeting);
            const response = {status: 200, meeting, visitors: result};
            res.status(response.status);
            res.json(response);
        } catch (err) {
            const response = {status: 500, error: err};
            res.status(response.status);
            res.json(response);
        }
    },

    clear: async (req, res) => {
        const meeting = req.params.meeting;
        try {
            await model.clear(meeting);
            const response = {status: 202, meeting, success: 'Meeting reset'};
            res.status(response.status);
            res.json(response);
        } catch (err) {
            const response = {status: 500, error: err};
            res.status(response.status);
            res.json(response);
        }
    }
};
