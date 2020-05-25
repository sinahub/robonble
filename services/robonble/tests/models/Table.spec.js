import { expect } from 'chai';
import Table from '../../models/Table.js';

describe('Table constructor tests', function () {
  it('New Table without parameters should initialise as 5 x 5', function () {
    const table = new Table();
    expect(table.width).to.equal(5);
    expect(table.height).to.equal(5);
  });

  it('New Table should initialise with parameters properly', function () {
    const testTableWH = (width, height) => {
      const table = new Table(width, height);
      expect(table.width).to.equal(width);
      expect(table.height).to.equal(height);
    }
    testTableWH(1, 2);
    testTableWH(3, 3);
  });
});