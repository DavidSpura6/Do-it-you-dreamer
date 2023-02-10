import { createHtml } from "lib/DOM";
import checkmark from "assets/done_20.svg?raw";
import variants from "./checkbox.module.scss";

export function Checkbox(
  ariaLabel: string,
  onChange?: (isChecked: boolean) => void,
  { includeLabel, checked }: { includeLabel?: boolean; checked: boolean } = {
    checked: false,
  }
) {
  const html = /*html*/ `<label class="${variants.primary}">
    <input ${
      checked ? `checked` : ``
    } aria-label="${ariaLabel}" type="checkbox" /> 
    <span class="${variants.checkbox__control}">${checkmark}</span>
    ${
      includeLabel ? `<span class="${variants.label}" >${ariaLabel}</span>` : ``
    }
  </label>`;

  const element = createHtml(html);
  if (onChange) {
    element
      .querySelector("input")!
      .addEventListener("change", (e) =>
        onChange((e.target as HTMLInputElement).checked)
      );
  }
  return element;
}
