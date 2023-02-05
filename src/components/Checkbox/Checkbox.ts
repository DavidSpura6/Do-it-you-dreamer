import { create } from "lib/DOM";
import checkmark from "assets/done_20.svg?raw";
import variants from "./checkbox.module.scss";

export function Checkbox(ariaLabel: string, onChange?: (e: Event) => void) {
  const label = create("label");
  label.classList.add(variants.primary);

  const input = create("input");
  input.ariaLabel = ariaLabel;
  input.type = "checkbox";
  input.checked = true;

  const checkboxControl = create("span");
  checkboxControl.classList.add(variants.checkbox__control);
  checkboxControl.innerHTML = checkmark;

  if (onChange)
    input.addEventListener("input", (e) => onChange((e.target as any).checked));

  label.append(input, checkboxControl);

  return label;
}
