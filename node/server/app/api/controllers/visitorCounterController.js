'use strict';
const model = require('../../models/visitorCounterModel');

module.exports = {
    incrementVisitor: (req, res) => {
        const meeting = req.params.meeting;

        console.log(`Increment meeting: ${meeting}`);
        model.increment(meeting).then((data) => {
            const response = {
                status: 200,
                success: 'Increment Successfully' + data
            };
            res.status(response.status);
            res.json(response);
        }).catch((err) => {
            console.log(`Error: ${err}`);

            const response = {
                status: 500,
                error: err
            };
            res.status(response.status);
            res.json(response);
        });
    },

    getTotalMeeting: (req, res) => {
        const meeting = req.params.meeting;

        console.log(`Get total visitor in meeting: ${meeting}`);

        model.getTotalMeeting(meeting).then(result => {
            console.log(`Visitors: ${result}`);

            const response = {
                status: 200,
                meeting,
                visitors: result
            };
            res.status(response.status);
            res.json(response);

        }).catch(err => {
            console.log(`Error: ${err}`);

            const response = {
                status: 500,
                error: err
            };
            res.status(response.status);
            res.json(response);
        });
    },

    clear: (req, res) => {
        const meeting = req.params.meeting;

        console.log(`Clear visitor in meeting: ${meeting}`);
        model.clear(meeting);
        const response = {
            status: 202,
            success: 'Meeting reset'
        };
        res.status(response.status);
        res.json(response);
    }
};
