const RoboModel = require('../models/roboModel.js')
const CMD = {
    MOVE: 0,
    LEFT: -1,
    RIGHT: 1
};
const FACE_DIR = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const NUM_OF_DIR = FACE_DIR.length;

exports.setup = (x, y, f) => {
    const newPosition = {
        X: x,
        Y: y,
        F: f
    }
    RoboModel.writeDB(newPosition);
    return
}

exports.move = (req, res) => {
    RoboModel.readDB(res);
    // .then(
    //     data => {
    //         moveRobot(data, CMD.MOVE);
    //     }
    // );
    return
}

exports.left = (req, res) => moveRobot(-1);
exports.right = (req, res) => moveRobot(1);

exports.report = (req, res) => {
    const sina = report(1, 2);
}

exports.moveRobot = (currentPos, action) => {
    let {x, y, f} = JSON.parse(currentPos);
    let newPos = '';
    const faceIndex = FACE_DIR.indexOf(f);
    switch (action) {
        case CMD.MOVE:
            newPos = forward(x, y, faceIndex)
            console.log(newPos)
            console.log('===============================================')
            break;
        case CMD.LEFT:
            console.log('rotating left')
            break;
        case CMD.RIGHT:
            console.log('rotating right')
            break;
        default:
            break;
    }
    return
} 

exports.forward = (x, y, f) => {
    let newX = x;
    let newY = y;
    if (f % 2 === 0) {
        newY += (f === 0) ? 1 : -1;
    } else {
        newX += (f === 0) ? 1 : -1;
    }
    if (true) {
        return {
            x,
            y,
            f
        }
    }
}