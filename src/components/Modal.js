import { buildElement } from "../utils/dom";

export default function modal(content, id) {
  const dialogContainer = buildElement("dialog", {
    class: "modal",
    id: id,
  });

  dialogContainer.append(content);

  return dialogContainer;
}

export function openModal(dialog) {
  if (!dialog || dialog.open) {
    return;
  }

  dialog.showModal();
}
export function closeModal(dialog) {
  if (!dialog || !dialog.open) {
    return;
  }

  dialog.close();
}

export function bindModalBehavior(dialog) {
  const onDialogClick = (event) => {
    if (event.target === dialog) {
      closeModal(dialog);
    }
  };

  const onCloseClick = (event) => {
    const closeButton = event.target.closest(".btn--close");

    if (closeButton && dialog.contains(closeButton)) {
      closeModal(dialog);
    }
  };

  const onEscapeClick = (event) => {
    if (event.key === "Escape" && dialog.open) {
      closeModal(dialog);
    }
  };

  dialog.addEventListener("click", onDialogClick);
  dialog.addEventListener("click", onCloseClick);
  document.addEventListener("keydown", onEscapeClick);

  return () => {
    dialog.removeEventListener("click", onDialogClick);
    dialog.removeEventListener("click", onCloseClick);
    document.removeEventListener("keydown", onEscapeClick);
  };
}
