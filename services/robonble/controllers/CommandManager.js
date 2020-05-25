const COMMAND_PLACE = 'PLACE';
const COMMAND_MOVE = 'MOVE';
const COMMAND_LEFT = 'LEFT';
const COMMAND_RIGHT = 'RIGHT';
const COMMAND_REPORT = 'REPORT';

/**
 * Apply the commands to the robot
 */
export default class CommandManager {
  /**
   * Construct with robot and the commands
   * @param {Robot|undefined} robot
   * @param {string} commands
   */
  constructor(robot = undefined, commands = '') {
    this.setRobot(robot);
    this.setCommands(commands);
  }

  /**
   * Robot etter
   * @param {Robot} robot
   */
  setRobot(robot) {
    this.robot = robot;
  }

  /**
   * Commands setter
   * @param {string} commands
   */
  setCommands(commands) {
    this.commands = commands ? commands.split(' ') : [];
  }

  /**
   * Apply the commands in order
   */
  execute() {
    if (this.robot && this.commands) {
      this.commands.forEach((com, index) => {
        // console.log(`${com}: `);
        const capCom = com.toUpperCase();
        switch(capCom) {
          case COMMAND_PLACE:
            // get parameters from the next element of the commands array
            const {x, y, face} = this.parsePlaceParams(this.commands[index + 1]);
            this.robot.place(
              x, y, face
            );
            break;
          case COMMAND_MOVE:
            this.robot.move();
            break;
          case COMMAND_LEFT:
            this.robot.left();
            break;
          case COMMAND_RIGHT:
            this.robot.right();
            break;
          case COMMAND_REPORT:
            this.robot.report();
            break;
          default:
            break;
        }
        // console.log(`${this.robot.x},${this.robot.y},${DIRECTIONS[this.robot.face]}`);
      });
    }
  }

  /**
   * Parse the string of PLACE parameters as x,y,face
   * @param {string} params
   */
  parsePlaceParams(params) {
    const paramsArr = params.split(',');
    if (paramsArr.length === 3) {
      return {x: parseInt(paramsArr[0]), y: parseInt(paramsArr[1]), face: paramsArr[2]};
    }
  }
}