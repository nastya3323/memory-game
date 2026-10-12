import "./styles/main.css";
import header from "./components/Header.js";
import main from "./components/MainContent.js";
import { createGame } from "./game/game.js";
import winModal, { initWinModal } from "./components/WinModal.js";
import modal from "./components/Modal.js";
import leaderboardModal, {
  initLeaderboardModal,
} from "./components/LeaderboardModal.js";
import { loadResults } from "./storage/leaderboard.js";
import { PAIRS_TOTAL } from "./data/icons.js";

const root = document.body;

const headerBlock = header({
  onNewGame: newGame,
  onOpenLeaderboard: openLeaderboard,
});

const mainBlock = main({
  pairsTotal: PAIRS_TOTAL,
});

const winDialog = modal(winModal(), "win-modal");
const leaderboardDialog = modal(leaderboardModal(), "leaderboard-modal");

root.append(headerBlock, mainBlock, winDialog, leaderboardDialog);

const boardEl = mainBlock.querySelector("#board");
const movesEl = mainBlock.querySelector("#moves");
const pairsEl = mainBlock.querySelector("#pairs");

const winApi = initWinModal(winDialog, { onNewGame: newGame });
const leaderboardApi = initLeaderboardModal(leaderboardDialog);

const game = createGame({
  boardEl,
  movesEl,
  pairsEl,
  onWin: (moves) => winApi(moves),
});

function newGame() {
  game.start();
}

function openLeaderboard() {
  const savedResults = loadResults();
  leaderboardApi(savedResults);
}
