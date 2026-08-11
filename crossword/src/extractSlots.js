/**
 * extractSlots.js
 *
 * Walks the parsed grid and figures out every "slot" — a run of fillable
 * cells that a single word must occupy, in either the "across" or "down"
 * direction. Also cross-checks the grid's own digits (0/1/2) against what
 * it actually finds, and builds the intersection table the solver needs
 * to check crossing letters against each other.
 */

function isFillable(grid, row, col) {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[row].length &&
    grid[row][col] !== '.'
  );
}

function extractSlots(grid) {
  const slots = [];
  const height = grid.length;
  const width = grid[0].length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (!isFillable(grid, row, col)) continue;

      const startsAcross =
        !isFillable(grid, row, col - 1) && isFillable(grid, row, col + 1);
      const startsDown =
        !isFillable(grid, row - 1, col) && isFillable(grid, row + 1, col);

      let startCount = 0;

      if (startsAcross) {
        const cells = [];
        let c = col;
        while (isFillable(grid, row, c)) {
          cells.push([row, c]);
          c++;
        }
        slots.push({
          index: slots.length,
          row,
          col,
          direction: 'across',
          length: cells.length,
          cells,
        });
        startCount++;
      }

      if (startsDown) {
        const cells = [];
        let r = row;
        while (isFillable(grid, r, col)) {
          cells.push([r, col]);
          r++;
        }
        slots.push({
          index: slots.length,
          row,
          col,
          direction: 'down',
          length: cells.length,
          cells,
        });
        startCount++;
      }

      // The grid's own digit at this cell tells us how many words are
      // supposed to start here. If it disagrees with what we just found,
      // the puzzle itself is malformed.
      const declared = parseInt(grid[row][col], 10);
      if (declared !== startCount) {
        throw new Error(
          `Invalid puzzle: cell (${row},${col}) declares ${declared} word start(s) but ${startCount} were found`
        );
      }
    }
  }

  validateFullCoverage(grid, slots);

  return slots;
}

// Every fillable cell must belong to at least one slot. A stray fillable
// cell that isn't part of any across/down run means the puzzle "leaves an
// empty cell" per the spec's error cases.
function validateFullCoverage(grid, slots) {
  const covered = new Set();
  slots.forEach((slot) => {
    slot.cells.forEach(([r, c]) => covered.add(`${r},${c}`));
  });

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isFillable(grid, row, col) && !covered.has(`${row},${col}`)) {
        throw new Error(
          `Invalid puzzle: cell (${row},${col}) is fillable but is not part of any word`
        );
      }
    }
  }
}

// For every pair of crossing slots (one across, one down, sharing a cell),
// record which position in each word must match the other.
function buildIntersections(slots) {
  const intersections = new Map();
  slots.forEach((slot) => intersections.set(slot.index, []));

  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      const a = slots[i];
      const b = slots[j];
      if (a.direction === b.direction) continue; // two across (or two down) slots never "cross"

      for (let posInA = 0; posInA < a.cells.length; posInA++) {
        const [ar, ac] = a.cells[posInA];
        for (let posInB = 0; posInB < b.cells.length; posInB++) {
          const [br, bc] = b.cells[posInB];
          if (ar === br && ac === bc) {
            intersections.get(a.index).push({
              withSlot: b.index,
              posInThis: posInA,
              posInOther: posInB,
            });
            intersections.get(b.index).push({
              withSlot: a.index,
              posInThis: posInB,
              posInOther: posInA,
            });
          }
        }
      }
    }
  }

  return intersections;
}

module.exports = { extractSlots, buildIntersections, isFillable };