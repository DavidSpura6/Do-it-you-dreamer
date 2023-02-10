type IdNames = "nav" | "layout" | "weekdays" | "day_view" | "overview";
type ElementIDs = `#${IdNames}`;

export function create<T extends keyof HTMLElementTagNameMap>(
  key: T,
  { css }: { css?: string } = {}
): HTMLElementTagNameMap[T] {
  const el = document.createElement(key);
  if (css) el.style.cssText = css;
  return el;
}

export function get(key: ElementIDs): HTMLDivElement;
export function get(key: keyof HTMLElementTagNameMap): HTMLDivElement;
export function get(key: string): HTMLDivElement {
  return document.querySelector(key)!;
}

export const createHtml = (html: string) => {
  const range = document.createRange();
  return range.createContextualFragment(html).firstChild as Element;
};
