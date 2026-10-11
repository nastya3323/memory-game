import { buildElement } from "../utils/dom";
import button from "./Button";
import { bindModalBehavior, openModal } from "./Modal";

const TABLE_HEADER = ["Место", "Ходы", "Дата"];

export function initLeaderboardModal(dialog) {
  bindModalBehavior(dialog);

  return (results) => {
    renderResults(dialog, results);
    openModal(dialog);
  };
}

export default function leaderboardModal() {
  const modalContent = buildElement("div", {
    class: "modal__content",
  });

  const title = buildElement("h2", {
    class: "modal__title",
    text: "Таблица лидеров",
  });

  const wrapper = buildElement("div", {
    class: "leaderboard__wrapper",
  });

  const table = buildElement("table", {
    class: "leaderboard",
  });

  const tableHead = buildElement("thead");
  const tableTrHead = buildElement("tr");

  const fragment = document.createDocumentFragment();

  TABLE_HEADER.forEach((text) => {
    const th = buildElement("th", {
      text: text,
    });

    fragment.append(th);
  });

  tableTrHead.append(fragment);
  tableHead.append(tableTrHead);

  const tableBody = buildElement("tbody", {
    id: "leaderboard-body",
  });

  const actions = buildElement("div", {
    class: "modal__actions",
  });

  actions.append(
    button({
      class: "btn btn--secondary btn--close",
      text: "Закрыть",
      type: "button",
      id: "leader-close",
    })
  );

  table.append(tableHead, tableBody);
  wrapper.append(table);

  modalContent.append(title, wrapper, actions);

  return modalContent;
}

function renderResults(dialog, results) {
  const tableBody = dialog.querySelector("#leaderboard-body");

  tableBody.replaceChildren();

  if (!results.length) {
    const tr = buildElement("tr");

    tr.append(
      buildElement("td", {
        text: "Результатов пока нет :(",
        colspan: 3,
      })
    );

    tableBody.append(tr);
  } else {
    const sorted = results
      .sort((a, b) => {
        return a.moves - b.moves;
      })
      .slice(0, 10);

    sorted.forEach((result, index) => {
      const tr = buildElement("tr");

      tr.append(
        buildElement("td", {
          text: index + 1,
        }),
        buildElement("td", {
          text: result.moves,
        }),
        buildElement("td", {
          text: result.date,
        })
      );

      tableBody.append(tr);
    });
  }
}
