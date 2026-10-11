import { buildElement } from "../utils/dom";
import board from "./Board";
import stats from "./Stats";

export default function main({ moves = 0, pairs = 0, pairsTotal = 8 } = {}) {
  const mainContainer = buildElement("main", {
    class: "main",
  });

  const statsSection = stats(moves, pairs, pairsTotal);
  const boardSection = board();

  mainContainer.append(statsSection, boardSection);
  return mainContainer;
}
