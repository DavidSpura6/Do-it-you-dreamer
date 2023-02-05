type IdNames = "nav" | "layout" | "weekdays" | "day_view" | "overview";
type ElementIDs = `#${IdNames}`;

export function create<T extends keyof HTMLElementTagNameMap>(
  key: T
): HTMLElementTagNameMap[T] {
  return document.createElement(key);
}

export function get(key: ElementIDs): HTMLDivElement;
export function get(key: keyof HTMLElementTagNameMap): HTMLDivElement;
export function get(key: string): HTMLDivElement {
  return document.querySelector(key)!;
}
