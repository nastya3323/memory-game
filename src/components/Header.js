import { buildElement } from "../utils/dom";
import button from "./Button";

export default function header({ onNewGame, onOpenLeaderboard }) {
  const headerContainer = buildElement("header", {
    class: "header",
  });

  const title = buildElement("h1", {
    class: "header__title",
    text: "Memory Game",
  });

  const actions = buildElement("div", {
    class: "header__actions",
  });

  actions.append(
    button({
      class: "btn btn--primary",
      text: "Новая игра",
      type: "button",
      id: "new-game",
      onClick: onNewGame,
    }),
    button({
      class: "btn btn--secondary",
      text: "Таблица лидеров",
      type: "button",
      id: "open-leaderboard",
      onClick: onOpenLeaderboard,
    })
  );

  headerContainer.append(title, actions);

  return headerContainer;
}
