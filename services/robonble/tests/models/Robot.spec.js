import { expect } from 'chai';
import Robot from '../../models/Robot.js';
import Table from '../../models/Table.js';

const setupRobot = () => {
  return new Robot(new Table());
}

describe('Robot constructor tests', function () {
  it('New Robot without table should initialise maxX and maxY with 0'), function () {
    const robot = new Robot();
    expect(robot.maxX).to.equal(0);
    expect(robot.maxY).to.equal(0);
  };

  it('New Robot should initialise maxX and maxY via the Table object', function () {
    const robot = setupRobot();
    expect(robot.maxX).to.equal(4);
    expect(robot.maxY).to.equal(4);
  });

  it('New Robot should initialise other properties properly', function () {
    const robot = setupRobot();
    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(0);
    expect(robot.face).to.equal(0);
    expect(robot.hasBeenPlaced).to.be.false;
  });
});

describe('Robot setters tests', function () {
  it('Table setter should update maxX and maxY via the Table object', function () {
    const robot = new Robot();
    const table = new Table();
    expect(robot.maxX).to.equal(0);
    expect(robot.maxY).to.equal(0);
    robot.setTable(table);
    expect(robot.maxX).to.equal(table.width - 1);
    expect(robot.maxY).to.equal(table.height - 1);
  })
});

describe('Validate position function tests', function () {
  const robot = setupRobot();
  it('Values of x/y are not numbers should return false', function () {
    expect(robot.validatePosition(null, null)).to.be.false;
    expect(robot.validatePosition(1, null)).to.be.false;
    expect(robot.validatePosition(null, 1)).to.be.false;
    expect(robot.validatePosition(1, '2')).to.be.false;
    expect(robot.validatePosition('1', 2)).to.be.false;
    expect(robot.validatePosition('1', '2')).to.be.false;
  });

  it('Values of x/y are not in the range should return false', function () {
    expect(robot.validatePosition(-1, 1)).to.be.false;
    expect(robot.validatePosition(1, -1)).to.be.false;
    expect(robot.validatePosition(-1, -2)).to.be.false;
    expect(robot.validatePosition(5, 1)).to.be.false;
    expect(robot.validatePosition(1, 5)).to.be.false;
    expect(robot.validatePosition(5, 8)).to.be.false;
  });

  it('Values of x/y are in the range should return true', function () {
    expect(robot.validatePosition(0, 2)).to.be.true;
    expect(robot.validatePosition(1, 0)).to.be.true;
    expect(robot.validatePosition(0, 0)).to.be.true;
    expect(robot.validatePosition(3, 4)).to.be.true;
    expect(robot.validatePosition(2, 2)).to.be.true;
  });
});

describe('Place function tests', function () {
  it('Valid x, y and face should update the properties', function () {
    const robot = setupRobot();
    const x = 1;
    const y = 2;
    const face = 'WEST';
    robot.place(x, y, face);
    expect(robot.x).to.equal(x);
    expect(robot.y).to.equal(y);
    expect(robot.face).to.equal(3);
    expect(robot.hasBeenPlaced).to.be.true;
  });

  it('Invalid x or/and y should NOT update the properties', function () {
    const robot = setupRobot();
    const x = 1;
    const y = -1;
    const face = 'WEST';
    robot.place(x, y, face);
    expect(robot.x).to.not.equal(x);
    expect(robot.y).to.not.equal(y);
    expect(robot.face).to.not.equal(3);
    expect(robot.hasBeenPlaced).to.be.false;
  });

  it('Invalid face should keep the previous value', function () {
    const robot = setupRobot();
    const x = 1;
    const y = 3;
    const newFace = 'WESTEAST';
    const oldFace = robot.face;
    robot.place(x, y, newFace);
    expect(robot.x).to.equal(x);
    expect(robot.y).to.equal(y);
    expect(robot.face).to.equal(oldFace);
    expect(robot.hasBeenPlaced).to.be.true;
  });
});

describe('Move function tests', function () {
  it('Should not move if it has not been placed', function () {
    const robot = setupRobot();
    const oldX = robot.x;
    const oldY = robot.y;
    const oldFace = robot.face;
    robot.move();
    expect(robot.x).to.equal(oldX);
    expect(robot.y).to.equal(oldY);
    expect(robot.face).to.equal(oldFace);
  });

  it('Should update relevant x/y properly', function () {
    const testUpdateXY = (face, xChange, yChange) => {
      const robot = setupRobot();
      const x = 1;
      const y = 1;
      robot.place(x, y, face);
      robot.move();
      expect(robot.x).to.equal(x + xChange);
      expect(robot.y).to.equal(y + yChange);
    }
    testUpdateXY('NORTH', 0, 1);
    testUpdateXY('EAST', 1, 0);
    testUpdateXY('SOUTH', 0, -1);
    testUpdateXY('WEST', -1, 0);
  });

  it('Should NOT update x/y when new position is out of range (0 -> Max)', function () {
    const robot = setupRobot();
    const testNotUpdateXY = (x, y, face) => {
      robot.place(x, y, face);
      robot.move();
      expect(robot.x).to.equal(x);
      expect(robot.y).to.equal(y);
    };
    let x = 0;
    let y = 0;
    testNotUpdateXY(x, y, 'WEST');
    testNotUpdateXY(x, y, 'SOUTH');
    x = 4;
    y = 4;
    testNotUpdateXY(x, y, 'NORTH');
    testNotUpdateXY(x, y, 'EAST');
  });
});

describe('Left and right function tests', function () {
  it('Should not turn if it has not been placed', function () {
    const robot = setupRobot();
    const oldFace = robot.face;
    robot.left();
    expect(robot.face).to.equal(oldFace);
    robot.right();
    expect(robot.face).to.equal(oldFace);
  });

  it('Should turn properly', function () {
    const robot = setupRobot();
    robot.place(0, 0, 'NORTH');
    robot.left();
    expect(robot.face).to.equal(3);
    robot.left();
    expect(robot.face).to.equal(2);
    robot.left();
    expect(robot.face).to.equal(1);
    robot.left();
    expect(robot.face).to.equal(0);
    robot.right();
    expect(robot.face).to.equal(1);
    robot.right();
    expect(robot.face).to.equal(2);
    robot.right();
    expect(robot.face).to.equal(3);
    robot.right();
    expect(robot.face).to.equal(0);
  });
});

describe('Report function tests', function () {
  it('Should not report if it has not been placed', function () {
    const robot = setupRobot();
    expect(robot.report()).to.be.undefined;
  });

  it('Should report properly', function () {
    const robot = setupRobot();
    const x = 1;
    const y = 2;
    const face = 'WEST';
    robot.place(x, y, face);
    expect(robot.report()).to.equal(`${x},${y},${face}`);
  });
});