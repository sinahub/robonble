'use strict';
const dataPath = './data.json';
const fs = require('fs');


exports.readDB = (res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
}

exports.writeDB = (data) => {
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), () => {
        console.log('ok');
    });
}