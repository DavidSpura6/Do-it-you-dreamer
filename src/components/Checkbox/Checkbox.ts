import { create } from "lib/DOM";
import variants from "./checkbox.module.scss";
import checkmark from "./checkmark.svg?raw";

export function Checkbox(onChange?: (e: Event) => void) {
  const label = create("label");
  label.classList.add(variants.primary);

  const input = create("input");
  input.type = "checkbox";
  input.checked = true;

  const checkboxControl = create("span");
  checkboxControl.classList.add(variants.checkbox__control);
  checkboxControl.innerHTML = checkmark;

  const checkboxLabel = create("span");
  checkboxLabel.classList.add(variants.checkbox__label);
  checkboxLabel.innerText = "Hello";

  if (onChange)
    input.addEventListener("input", (e) => onChange((e.target as any).checked));

  label.append(input, checkboxControl, checkboxLabel);

  return label;
}
