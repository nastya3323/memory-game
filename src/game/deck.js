import { icons } from "../data/icons";
import { shuffle } from "../utils/shuffle";

export function createDeck() {
  return shuffle([...icons, ...icons]);
}
