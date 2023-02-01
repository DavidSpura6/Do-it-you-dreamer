import { create } from "lib/DOM";
import variants from "./buttons.module.scss";

type Options = {
  onClick?: (e: MouseEvent) => void;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
};

export function Button(
  html: string,
  { variant = "solid", type = "button", onClick }: Options = {}
) {
  const btn = create("button");
  btn.type = type;
  btn.innerHTML = html;
  btn.classList.add(variants[variant]);
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}
