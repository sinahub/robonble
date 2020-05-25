import { expect } from 'chai';
import sinon from 'sinon';
import Robot from '../../models/Robot.js';
import Table from '../../models/Table.js';
import CommandManager from '../../controllers/CommandManager.js';

const commandsStr = 'PLACE 1,1,NORTH MOVE RIGHT MOVE REPORT';
const commandsArr = ['PLACE', '1,1,NORTH', 'MOVE', 'RIGHT', 'MOVE', 'REPORT'];

const setupManager = (commandStr) => {
  const table = new Table();
  const robot = new Robot(table);
  const manager = new CommandManager(robot, commandStr);
  return {manager, robot, table};
}

describe('Command manager constructor tests', function () {
  it('New manager without robot and commands should initialise them properly', function () {
    const cm = new CommandManager();
    expect(cm.robot).to.be.undefined;
    expect(cm.commands).to.deep.equal([]);
  });

  it('Should update the properties properly', function () {
    const { manager, robot } = setupManager(commandsStr);
    expect(manager.robot).to.equal(robot);
    expect(manager.commands).to.deep.equal(commandsArr);
  });
});

describe('Command manager setters tests', function () {
  it('Robot setter should update the robot property', function () {
    const cm = new CommandManager();
    const robot = new Robot();
    cm.setRobot(robot);
    expect(cm.robot).to.equal(robot);
  })

  it('Commands string setter should update the commands property', function () {
    const cm = new CommandManager();
    cm.setCommands(commandsStr);
    expect(cm.commands).to.deep.equal(commandsArr);
  })
});

describe('Parse Place parameters function tests', function () {
  it('Should not return result if string of parameters is invalid', function () {
    const cm = new CommandManager();
    expect(cm.parsePlaceParams('1,2')).to.be.undefined;
    expect(cm.parsePlaceParams('1 2 NORTH')).to.be.undefined;
    expect(cm.parsePlaceParams('1')).to.be.undefined;
  });

  it('Should return result properly', function () {
    const cm = new CommandManager();
    expect(cm.parsePlaceParams('1,2,NORTH')).to.deep.equal({x: 1, y: 2, face: 'NORTH'});
    expect(cm.parsePlaceParams('0,4,WEST')).to.deep.equal({x: 0, y: 4, face: 'WEST'});
  });
});

describe('Execute function tests', function () {
  it('Should not return result if robot and commands has not been set', function () {
    const cm = new CommandManager();
    expect(cm.execute()).to.be.undefined;
  });

  it('Should be able to accept command in any letter cases', function () {
    const { manager, robot } = setupManager('PlAce 1,2,noRth');
    const spy = sinon.spy(robot, 'place');
    manager.execute();
    expect(spy.called).to.be.true;
    spy.restore();
  });

  it('Should parse parameters following PLACE command', function () {
    const { manager, robot } = setupManager('PlACE 1,2,NORTH');
    const spy = sinon.spy(manager, 'parsePlaceParams');
    manager.execute();
    expect(spy.calledWith('1,2,NORTH')).to.be.true;
    spy.restore();
  });

  it('Should call relevant Robot functions according to the command', function () {
    const spyRobotFunction = (funcName) => {
      return sinon.spy(robot, funcName);
    }
    const { manager, robot } = setupManager('PLACE 1,2,NORTH MOVE LEFT RIGHT REPORT');
    const placeSpy = spyRobotFunction('place');
    const moveSpy = spyRobotFunction('move');
    const leftSpy = spyRobotFunction('left');
    const rightSpy = spyRobotFunction('right');
    const reportSpy = spyRobotFunction('report');
    manager.execute();
    expect(placeSpy.called).to.be.true;
    expect(moveSpy.called).to.be.true;
    expect(leftSpy.called).to.be.true;
    expect(rightSpy.called).to.be.true;
    expect(reportSpy.called).to.be.true;
    placeSpy.restore();
    moveSpy.restore();
    leftSpy.restore();
    rightSpy.restore();
    reportSpy.restore();
  })
});