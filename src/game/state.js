import { PAIRS_TOTAL } from "../data/icons";

export function createInitialState() {
  return {
    moves: 0,
    pairs: 0,
    pairsTotal: PAIRS_TOTAL,
    firstCard: null,
    secondCard: null,
    lockBoard: false,
  };
}
