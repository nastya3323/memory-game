export function areCardsEqual(a, b) {
  return a.dataset.icon === b.dataset.icon;
}

export function canFlipCard(state, card) {
  return (
    !state.lockBoard &&
    !card.classList.contains("is-flipped") &&
    !card.classList.contains("is-matched")
  );
}

export function shouldLockBoard(state) {
  return state.secondCard !== null;
}

export function hasWon(state) {
  return state.pairs === state.pairsTotal;
}
