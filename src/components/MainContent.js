import { createInitialState } from "../game/state";
import { buildElement } from "../utils/dom";
import board from "./Board";
import stats from "./Stats";

export default function main() {
  const state = createInitialState();

  const mainContainer = buildElement("main", {
    class: "main",
  });

  const statsSection = stats(state.moves, state.pairs, state.pairsTotal);
  const boardSection = board();

  mainContainer.append(statsSection, boardSection);
  return mainContainer;
}
