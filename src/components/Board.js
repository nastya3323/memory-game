import { buildElement } from "../utils/dom";
import card from "./Card";

export default function board() {
  const section = buildElement("section", {
    class: "board",
    id: "board",
    "aria-label": "Игровое поле",
  });

  return section;
}

export function renderCards({ boardEl, cards, onCardClick }) {
  const fragment = document.createDocumentFragment();

  cards.forEach((icon) => {
    fragment.append(card({ icon, onClick: onCardClick }));
  });

  boardEl.replaceChildren(fragment);
}
