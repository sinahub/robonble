import { logStd } from '../utils/logger.js';

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const NUM_OF_DIRECTIONS = DIRECTIONS.length;

/**
 * The Robot Object
 */
export default class Robot {
  /**
   * Initialise table constraints, x, y, face and if placed.
   * @param {Table|undefined} table
   */
  constructor(table = undefined) {
    this.maxX = 0;
    this.maxY = 0;
    this.setTable(table);
    this.x = 0;
    this.y = 0;
    this.face = 0;
    this.hasBeenPlaced = false;
  }

  /**
   * Set max x and y referring to a table object
   * @param {Table} table
   */
  setTable(table) {
    if (table) {
      this.maxX = table.width - 1;
      this.maxY = table.height - 1;
    }
  }

  /**
   * Place function
   * @param {number} x
   * @param {number} y
   * @param {string} face
   */
  place(x, y, face) {
    if (this.validatePosition(x, y)) {
      this.x = x;
      this.y = y;
      // Assume keeping previous/default facing
      // if face value is invalid
      const faceIndex = DIRECTIONS.indexOf(face);
      if ( faceIndex >= 0) {
        this.face = faceIndex;
      }
      this.hasBeenPlaced = true;
    }
  }

  /**
   * Move function. Must be placed before moving.
   */
  move() {
    if (this.hasBeenPlaced) {
      let newX = this.x;
      let newY = this.y;
      // Follow the index of directions
      // 0, 2 are on Y axis; 1, 3 are on X axis
      if (this.face % 2 === 0) {
        newY += (this.face === 0) ? 1 : -1;
      } else {
        newX += (this.face === 1) ? 1 : -1;
      }
      if (this.validatePosition(newX, newY)) {
        this.x = newX;
        this.y = newY;
      }
    }
  }

  /**
   * Turning left function. Must be placed before turning.
   */
  left() {
    if (this.hasBeenPlaced) {
      this.face = (this.face + NUM_OF_DIRECTIONS - 1) % NUM_OF_DIRECTIONS;
    }
  }

  /**
   * Turning right function. Must be placed before turning.
   */
  right() {
    if (this.hasBeenPlaced) {
      this.face = (this.face + 1) % NUM_OF_DIRECTIONS;
    }
  }

  /**
   *  Report function.
   *  Assume not reporting if the robot never been placed.
   *  @return {string}
   */
  report() {
    if (this.hasBeenPlaced) {
      const output = `${this.x},${this.y},${DIRECTIONS[this.face]}`;
      logStd(output);
      return output;
    }
  }

  /**
   * Validate the (x, y) is in the range of the table.
   * Including the data type checking to avoid exceptions.
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  validatePosition(x, y) {
    return (typeof x === 'number' && typeof y === 'number') && (x >= 0 && x <= this.maxX) && (y >= 0 && y <= this.maxY)
  }
}