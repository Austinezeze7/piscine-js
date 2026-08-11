/**
 * crosswordSolver.js
 *
 * Required entry point for the project. Wires together parsing, slot
 * extraction, the backtracking solver, and output formatting, and prints
 * either the solved grid or 'Error' as required by the spec.
 */

const { parseGrid } = require('./src/parseGrid');
const { extractSlots, buildIntersections } = require('./src/extractSlots');
const { solve } = require('./src/solve');
const { formatOutput } = require('./src/formatOutput');

function validateWordsAgainstSlots(words, slots) {
  if (!Array.isArray(words) || words.length === 0) return false;
  if (words.length !== slots.length) return false;

  if (!words.every((w) => typeof w === 'string' && w.length > 0)) return false;

  // A word can only be used once.
  const uniqueWords = new Set(words);
  if (uniqueWords.size !== words.length) return false;

  // Fast fail: if the multiset of word lengths doesn't match the multiset
  // of slot lengths, there's no point even attempting to backtrack.
  const wordLengths = words.map((w) => w.length).sort((a, b) => a - b);
  const slotLengths = slots.map((s) => s.length).sort((a, b) => a - b);

  for (let i = 0; i < wordLengths.length; i++) {
    if (wordLengths[i] !== slotLengths[i]) return false;
  }

  return true;
}

function crosswordSolver(puzzleString, words) {
  try {
    const grid = parseGrid(puzzleString);
    const slots = extractSlots(grid);

    if (slots.length === 0) {
      console.log('Error');
      return;
    }

    if (!validateWordsAgainstSlots(words, slots)) {
      console.log('Error');
      return;
    }

    const intersections = buildIntersections(slots);
    const solutions = solve(slots, words, intersections);

    if (solutions.length !== 1) {
      // 0 solutions: nothing fits. 2+ solutions: ambiguous. Both are errors.
      console.log('Error');
      return;
    }

    const result = formatOutput(grid, slots, solutions[0]);
    console.log(result);
  } catch (err) {
    // Any parsing/validation error (bad characters, ragged rows, mismatched
    // digit labels, uncovered cells, etc.) collapses to the same 'Error' output.
    console.log('Error');
  }
}

module.exports = crosswordSolver;
module.exports.crosswordSolver = crosswordSolver;

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']
crosswordSolver(puzzle, words)