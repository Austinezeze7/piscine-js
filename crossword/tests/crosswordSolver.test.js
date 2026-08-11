/**
 * crosswordSolver.test.js
 *
 * A small, dependency-free test runner (no Jest/Mocha required — just
 * plain Node). Run it with:
 *
 *   node tests/crosswordSolver.test.js
 */

const crosswordSolver = require('../crosswordSolver');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`\u2713 ${name}`);
    passed++;
  } catch (err) {
    console.log(`\u2717 ${name}`);
    console.log(`  ${err.message}`);
    failed++;
  }
}

// Temporarily swaps console.log so we can capture what crosswordSolver prints.
function captureOutput(fn) {
  const originalLog = console.log;
  let output = '';
  console.log = (msg) => {
    output += msg;
  };
  try {
    fn();
  } finally {
    console.log = originalLog;
  }
  return output;
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message || 'Assertion failed'}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`
    );
  }
}

// --- 1. The worked example from the spec ---
test('solves the example puzzle from the spec', () => {
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['casa', 'alan', 'ciao', 'anta'];
  const expected = 'casa\ni..l\nanta\no..n';

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, expected);
});

// --- 2. Word count doesn't match slot count ---
test('prints Error when word count does not match slot count', () => {
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['casa', 'alan', 'ciao']; // one short

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 3. Word lengths don't match slot lengths ---
test('prints Error when word lengths do not match slot lengths', () => {
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['cas', 'alan', 'ciao', 'anta']; // 'cas' is 3 letters, slots need 4

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 4. Ragged (non-rectangular) grid ---
test('prints Error for a non-rectangular grid', () => {
  const puzzle = '2001\n0..0\n100\n0..0'; // row 3 is missing a character
  const words = ['casa', 'alan', 'ciao', 'anta'];

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 5. Invalid character in the grid ---
test('prints Error for invalid characters in the grid', () => {
  const puzzle = '200X\n0..0\n1000\n0..0';
  const words = ['casa', 'alan', 'ciao', 'anta'];

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 6. No arrangement satisfies the crossings ---
test('prints Error when no arrangement satisfies the crossings', () => {
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['casa', 'blob', 'ciao', 'anta']; // 'blob' breaks every crossing

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 7. Duplicate words in the word list ---
test('prints Error when the word list has duplicate words', () => {
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['casa', 'casa', 'ciao', 'anta'];

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 8. Empty puzzle string ---
test('prints Error for an empty puzzle string', () => {
  const output = captureOutput(() => crosswordSolver('', ['casa']));
  assertEqual(output, 'Error');
});

// --- 9. Ambiguous puzzle: multiple valid solutions ---
test('prints Error when the puzzle has more than one valid solution', () => {
  // Two completely independent 2-letter across words (separated by a row
  // of dots, so they never cross). With no shared constraint linking them,
  // both ['at', 'on'] and ['on', 'at'] are valid placements -> ambiguous.
  const puzzle = '10\n..\n10';
  const words = ['at', 'on'];

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

// --- 10. A cell's declared digit disagrees with reality ---
test('prints Error when a cell declares the wrong number of word starts', () => {
  // (0,0) is declared '2' but only a horizontal word actually starts there
  // (there's no fillable cell below it), so this should be invalid.
  const puzzle = '2001\n...0\n0000\n...0';
  const words = ['casa', 'aoxa', 'ax', 'aa'];

  const output = captureOutput(() => crosswordSolver(puzzle, words));
  assertEqual(output, 'Error');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);