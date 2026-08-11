/**
 * solve.js
 *
 * The actual solving engine. Tries to assign each word to a slot using
 * backtracking, respecting every intersection constraint. Keeps searching
 * past the first solution it finds so the caller can tell a unique
 * solution apart from an ambiguous puzzle.
 */

function fitsIntersections(word, slotIndex, assignment, intersections) {
  const rels = intersections.get(slotIndex) || [];
  for (const rel of rels) {
    const otherWord = assignment[rel.withSlot];
    if (otherWord === undefined) continue; // that slot isn't filled yet, nothing to check
    if (word[rel.posInThis] !== otherWord[rel.posInOther]) {
      return false;
    }
  }
  return true;
}

function solve(slots, words, intersections) {
  const solutions = [];
  const assignment = new Array(slots.length).fill(undefined);
  const usedWords = new Set();

  // Solve the most constrained (most intersections) slots first — this
  // prunes dead branches much earlier than going in raw grid order.
  const order = slots
    .map((s, i) => i)
    .sort(
      (a, b) => (intersections.get(b) || []).length - (intersections.get(a) || []).length
    );

  function backtrack(pos) {
    // We only need to know if there's more than one solution, not find them all.
    if (solutions.length > 1) return;

    if (pos === order.length) {
      solutions.push(assignment.slice());
      return;
    }

    const slotIndex = order[pos];
    const slot = slots[slotIndex];

    for (const word of words) {
      if (usedWords.has(word)) continue;
      if (word.length !== slot.length) continue;
      if (!fitsIntersections(word, slotIndex, assignment, intersections)) continue;

      assignment[slotIndex] = word;
      usedWords.add(word);

      backtrack(pos + 1);

      usedWords.delete(word);
      assignment[slotIndex] = undefined;

      if (solutions.length > 1) return;
    }
  }

  backtrack(0);

  return solutions; // 0 = no solution, 1 = unique, 2+ = ambiguous
}

module.exports = { solve, fitsIntersections };