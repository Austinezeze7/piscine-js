# Crossword Solver

A crossword puzzle solver that fills an empty grid with a given list of words, following the placement rules encoded in the grid itself, and prints the unique solved puzzle — or `Error` if no unique solution exists.

## Project structure

```
crossword/
├── crosswordSolver.js     # exports crosswordSolver(puzzle, words) — required filename
├── src/
│   ├── parseGrid.js        # parses & validates the raw puzzle string into a 2D grid
│   ├── extractSlots.js     # finds word slots + builds the intersection table
│   ├── solve.js             # backtracking search + uniqueness check
│   └── formatOutput.js     # stamps the solved words back onto the grid shape
├── tests/
│   └── crosswordSolver.test.js
└── README.md
```

## How to run

No external dependencies are required.

```bash
node tests/crosswordSolver.test.js
```

This runs a small built-in test suite (plain Node, no Jest/Mocha) and prints a pass/fail summary.

To use the solver directly:

```js
const crosswordSolver = require('./crosswordSolver');

const emptyPuzzle = '2001\n0..0\n1000\n0..0';
const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);
```

Output (printed to the console):

```
casa
i..l
anta
o..n
```

## Puzzle input format

The puzzle is a single string:

- **A digit** marks a fillable cell.
  - `0` — fillable, but not the start of a word.
  - `1` — a word starts here, in whichever single direction is actually possible.
  - `2` — a word starts here in **both** directions (across and down).
- **`.`** — a blocked cell. Always stays `.` in the output.
- **`\n`** — ends a row.

A cell "starts" a word in a direction if there's no fillable cell before it in that direction (grid edge or a `.`), and there **is** a fillable cell after it.

## Algorithm overview

1. **Parse** — validate the string is rectangular and only contains digits/`.`, build a 2D grid.
2. **Extract slots** — find every word position (start cell, direction, length). Cross-check each cell's declared digit against what's actually there, and confirm every fillable cell belongs to some word (otherwise the puzzle "leaves an empty cell").
3. **Validate word list** — word count must match slot count, no duplicate words, and the sorted word lengths must match the sorted slot lengths (fast fail before searching).
4. **Backtrack** — try assigning words to slots (most-constrained slots first), checking every letter shared at an intersection against the words already placed.
5. **Check uniqueness** — keep searching past the first solution found; stop early once a second one turns up.
6. **Format & print** — if exactly one solution exists, stamp its letters back onto the grid and print it. Otherwise, print `Error`.

## Error cases

`crosswordSolver` prints `'Error'` if:

- The puzzle string is empty, non-rectangular, or contains invalid characters.
- A cell's declared digit doesn't match the number of word-starts actually found there.
- A fillable cell isn't part of any word.
- The word list is empty, has the wrong number of words, contains duplicates, or has word lengths that don't match the puzzle's slot lengths.
- No arrangement of the given words satisfies every intersection.
- More than one arrangement satisfies every intersection (ambiguous puzzle).

## Contributors

_(Paul Owuor
Austine zeze)_