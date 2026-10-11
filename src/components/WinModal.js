import { buildElement } from "../utils/dom";
import button from "./Button";
import { bindModalBehavior, closeModal, openModal } from "./Modal";

export function initWinModal(dialog, { onNewGame }) {
  bindModalBehavior(dialog);

  const newGameBtn = dialog.querySelector("#win-new-game");
  const winMoves = dialog.querySelector("#win-moves");

  newGameBtn.addEventListener("click", () => {
    closeModal(dialog);

    onNewGame();
  });

  return (moves) => {
    winMoves.textContent = moves;
    openModal(dialog);
  };
}

export default function winModal() {
  const modalContent = buildElement("div", {
    class: "modal__content",
  });

  const title = buildElement("h2", {
    class: "modal__title",
    text: "Победа! 🎉",
  });

  const text = buildElement("p", {
    class: "modal__text",
    text: "Вы нашли все пары за ",
  });

  text.append(
    buildElement("strong", {
      id: "win-moves",
      text: "",
    }),
    " ходов."
  );

  const actions = buildElement("div", {
    class: "modal__actions",
  });

  actions.append(
    button({
      class: "btn btn--secondary btn--close",
      text: "Закрыть",
      type: "button",
      id: "win-close",
    }),
    button({
      class: "btn btn--primary",
      text: "Новая игра",
      type: "button",
      id: "win-new-game",
    })
  );

  modalContent.append(title, text, actions);
  return modalContent;
}
