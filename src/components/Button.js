import { buildElement } from "../utils/dom";

export default function button({ onClick, ...props } = {}) {
  const btn = buildElement("button", props);

  if (onClick) {
    btn.addEventListener("click", onClick);
  }

  return btn;
}
