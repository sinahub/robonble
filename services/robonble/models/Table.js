const DEFAULT_TABLE_WIDTH = 5;
const DEFAULT_TABLE_HEIGHT = 5;

/**
 * The Table Object
 */
export default class Table {
  /**
   * Constructor of the Class Table
   * @param {number} width A positive integer.
   * @param {number} height A positive integer.
   */
  constructor(width = DEFAULT_TABLE_WIDTH, height = DEFAULT_TABLE_HEIGHT) {
    this.width = width;
    this.height = height;
  }
}