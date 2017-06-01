'use strict';

const fs = require('fs');
const baseData = './data/';

const Visitor = function (meeting) {
    this.data = new Date();
    this.meeting = meeting;
};

module.exports = {
    /**
     * Increment meeting counter
     * @param {String} meeting name of meeting
     */
    increment: (meeting) => new Promise((resolve, reject) => {
        const visitor = new Visitor(meeting);
        try {
            fs.appendFileSync(`${baseData}${meeting}.txt`, JSON.stringify(visitor) + "\n");
            resolve();
        } catch (err) {
            reject(err.message);
        }
    }),


    /**
     * Clear counter for specific meeting
     * @param {String} meeting name of meeting
     */
    clear: (meeting) => new Promise((resolve, reject) => {
        try {
            fs.unlinkSync(`${baseData}${meeting}.txt`);
            resolve();
        } catch (err) {
            reject(err.message);
        }
    }),


    /**
     * Get number of visitors in meeting
     * @param {String} meeting name of meeting
     * @return {Promise} number of visitors
     */
    getTotalMeeting: (meeting) => new Promise((resolve, reject) => {
        const readAsync = promisify(fs.readfile);git push -f origin HEAD^:master
        fs.readFile(`${baseData}${meeting}.txt`, (err, data) => {
            if (err) reject(err);
            try {
                let res = data.toString().split('\n').length;
                res--;
                if (res < 0) res = 0;
                resolve(res);
            }
            catch (err) {
                reject(err.message);
            }
        });
    }),

};

