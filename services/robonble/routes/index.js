import chalk from 'chalk';
import Table from '../models/Table.js';
import Robot from '../models/Robot.js';
import CommandManager from '../controllers/CommandManager.js';

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

var express = require('express');
var router = express.Router();


/**
 * Initialise the necessary objects and controller
 * @param {String} commandsStr
 * @return {CommandManager}
 */
const initObjects = (commandsStr) => {
    const table = new Table();
    const robot = new Robot(table);
    const manager = new CommandManager(robot, commandsStr);
    return manager;
  }
  

router.get('/', (req, res, next) => res.status(200).send('Welcome!'));
router.get('/api/v1.0/:commands', (req, res) => {
  // receive commands
  const commands = req.params.commands;
  const manager = initObjects(commands);
  // execute commands
  manager.execute();
  const output = `${manager.robot.x},${manager.robot.y},${DIRECTIONS[manager.robot.face]}`;
  res.status(200).send(output);
})

  module.exports = router;