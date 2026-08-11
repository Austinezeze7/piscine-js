/**
 * parseGrid.js
 *
 * Turns the raw puzzle string into a validated 2D array of characters.
 * This is the very first step of the pipeline — nothing downstream should
 * ever have to deal with a malformed grid, because we throw here instead.
 */

function parseGrid(puzzleString) {
  if (typeof puzzleString !== 'string' || puzzleString.length === 0) {
    throw new Error('Invalid puzzle: input must be a non-empty string');
  }

  const rows = puzzleString.split('\n');

  if (rows.length === 0 || rows.some((row) => row.length === 0)) {
    throw new Error('Invalid puzzle: grid contains an empty row');
  }

  const width = rows[0].length;

  for (const row of rows) {
    if (row.length !== width) {
      throw new Error('Invalid puzzle: all rows must have the same length');
    }
    for (const ch of row) {
      if (ch !== '.' && !/^[0-9]$/.test(ch)) {
        throw new Error(`Invalid puzzle: illegal character "${ch}"`);
      }
    }
  }

  // 2D array: grid[row][col]
  return rows.map((row) => row.split(''));
}

module.exports = { parseGrid };