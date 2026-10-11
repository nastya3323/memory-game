import { formatDate } from "../utils/formatDate";

const STORAGE_KEY = "leaderboard";

export function loadResults() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveResults(moves) {
  const saved = loadResults();
  const result = createResult(moves);

  saved.push(result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export function createResult(moves) {
  const date = new Date();

  return {
    moves,
    date: formatDate(date),
  };
}
