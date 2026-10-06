import { buildElement } from "../utils/dom";

export default function stats(moves, pairs, pairsTotal) {
  const section = buildElement("section", {
    class: "stats",
    "aria-label": "Статистика игры",
  });

  const firstItem = buildElement("div", {
    class: "stats__item",
  });

  firstItem.append(
    buildElement("span", {
      class: "stats__label",
      text: "Ходы",
    }),
    buildElement("span", {
      class: "stats__value",
      text: moves,
      id: "moves",
    })
  );

  const secondItem = buildElement("div", {
    class: "stats__item",
  });

  secondItem.append(
    buildElement("span", {
      class: "stats__label",
      text: "Найдено пар",
    })
  );

  const secondValue = buildElement("span", {
    class: "stats__value",
  });

  secondValue.append(
    buildElement("span", {
      text: pairs,
      id: "pairs",
    }),
    " / ",
    buildElement("span", {
      text: pairsTotal,
      id: "pairs-total",
    })
  );

  secondItem.append(secondValue);
  section.append(firstItem, secondItem);

  return section;
}
