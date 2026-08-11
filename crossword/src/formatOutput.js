/**
 * formatOutput.js
 *
 * Takes the solved assignment (one word per slot) and stamps the letters
 * back onto a copy of the original grid, then joins it back into the
 * newline-separated string format the puzzle came in as.
 */

function formatOutput(grid, slots, assignment) {
  const output = grid.map((row) => row.slice());

  slots.forEach((slot, i) => {
    const word = assignment[i];
    slot.cells.forEach(([r, c], idx) => {
      output[r][c] = word[idx];
    });
  });

  return output.map((row) => row.join('')).join('\n');
}

module.exports = { formatOutput };