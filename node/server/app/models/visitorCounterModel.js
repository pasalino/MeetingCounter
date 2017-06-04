'use strict';

const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const fsReadProm = promisify(fs.readFile);
const fsReaddirProm = promisify(fs.readdir);
const fsAppendFile = promisify(fs.appendFile);
const fsUnlink = promisify(fs.unlink);
const {Promise} = require('bluebird');

const baseData = './data/meetings';

const Visitor = function (meeting) {
    this.data = new Date();
    this.meeting = meeting;
};

module.exports = {

    /**
     * Increment meeting counter
     * @param {String} meeting name of meeting
     */
    increment: async (meeting) => {
        const visitor = new Visitor(meeting);
        try {
            await fsAppendFile(`${baseData}/${meeting}.txt`, JSON.stringify(visitor) + '\n');
        } catch (err) {
            throw err;
        }
    },


    /**
     * Clear counter for specific meeting
     * @param {String} meeting name of meeting
     */
    clear: async (meeting) => {
        try {
            await fsUnlink(`${baseData}/${meeting}.txt`);
        } catch (err) {
            throw err;
        }
    },

    /**
     * Get number of visitors in meeting
     * @param {String} meeting name of meeting
     * @return {Number} number of visitors
     */
    getTotalVisitorsInMeeting: async (meeting) => {
        try {
            const data = await fsReadProm(`${baseData}/${meeting}.txt`);
            let res = data.toString().split('\n').length;
            res--;
            if (res < 0) res = 0;
            return res;
        }
        catch (err) {
            throw err;
        }
    },

    /**
     * Get list of Meetings
     * @return lit of Meetings
     */
    getMeetingList: async () => {
        try {
            let files = await fsReaddirProm(baseData);
            files = await Promise.filter(files, file => {
                return ".txt" === path.extname(file);
            });
            files = await Promise.map(files, file => {
                return file.replace('.txt', '');
            });

            return files;
        }
        catch (err) {
            throw err;
        }
    },
};

