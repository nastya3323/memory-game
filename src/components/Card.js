import { buildElement } from "../utils/dom";
import button from "./Button";

export default function card({ icon, onClick }) {
  const btn = button({
    onClick: () => onClick?.(btn),
    class: "card",
    type: "button",
    "aria-label": "Карточка",
    "data-icon": icon,
  });

  const cardInner = buildElement("span", {
    class: "card__inner",
  });

  const faceBack = buildElement("span", {
    class: "card__face card__face--back",
  });
  const faceFront = buildElement("span", {
    class: "card__face card__face--front",
  });

  faceFront.append(
    buildElement("img", {
      src: `/icons/${icon}`,
      alt: "",
      draggable: "false",
    })
  );

  cardInner.append(faceBack, faceFront);
  btn.append(cardInner);

  return btn;
}
