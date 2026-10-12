import { renderCards } from "../components/Board.js";
import { saveResults } from "../storage/leaderboard.js";
import { createDeck } from "./deck.js";
import {
  areCardsEqual,
  canFlipCard,
  hasWon,
  shouldLockBoard,
} from "./rules.js";
import { createInitialState } from "./state.js";

const CARD_DISPLAY_DELAY = 700;

export function createGame({ boardEl, movesEl, pairsEl, onWin }) {
  let state = createInitialState();
  let timerId;

  function start() {
    clearTimeout(timerId);
    state = createInitialState();
    renderCards({ boardEl, cards: createDeck(), onCardClick: handleCardClick });

    updateStats();
  }

  function handleCardClick(cardEl) {
    if (!canFlipCard(state, cardEl)) {
      return;
    }

    selectCard(cardEl);

    if (shouldLockBoard(state)) {
      incrementMoves();
      lockBoard();
      checkPair();
    }
  }

  function selectCard(cardEl) {
    cardEl.classList.add("is-flipped");

    if (!state.firstCard) {
      state.firstCard = cardEl;
    } else {
      state.secondCard = cardEl;
    }
  }

  function checkPair() {
    if (areCardsEqual(state.firstCard, state.secondCard)) {
      handleMatch(state.firstCard, state.secondCard);
    } else {
      handleMismatch(state.firstCard, state.secondCard);
    }
  }

  function handleMatch(first, second) {
    first.classList.add("is-matched");
    second.classList.add("is-matched");

    state.pairs += 1;

    reset(first, second);
    updateStats();

    if (hasWon(state)) {
      finishGame();
    }
  }

  function handleMismatch(first, second) {
    updateStats();
    timerId = setTimeout(() => {
      reset(first, second);
    }, CARD_DISPLAY_DELAY);
  }

  function unflip(cardEl) {
    cardEl.classList.remove("is-flipped");
  }

  function incrementMoves() {
    state.moves += 1;
  }

  function updateStats() {
    movesEl.textContent = String(state.moves);
    pairsEl.textContent = String(state.pairs);
  }

  function lockBoard() {
    state.lockBoard = true;
  }

  function unlockBoard() {
    state.lockBoard = false;
  }

  function reset(first, second) {
    unflip(first);
    unflip(second);
    state.firstCard = null;
    state.secondCard = null;
    unlockBoard();
  }

  function finishGame() {
    onWin(state.moves);
    saveResults(state.moves);
  }

  start();

  return { start };
}
