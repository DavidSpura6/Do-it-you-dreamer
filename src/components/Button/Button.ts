import { create } from "lib/DOM";
import variants from "./buttons.module.scss";

type Options = {
  onClick?: (e: MouseEvent) => void;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  icon?: string;
};

export function Button(
  html: string,
  { variant = "solid", type = "button", onClick, icon }: Options = {}
) {
  const btn = create("button");
  btn.type = type;
  btn.innerHTML = html;
  btn.classList.add(variants[variant]);

  if (variant === "icon") btn.title = html;
  if (icon) btn.innerHTML = icon;

  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}
