type IdNames =
  | "nav"
  | "layout"
  | "weekdays"
  | "day_view"
  | "overview"
  | "day_view_title"
  | "day_view_subtitle";

type ElementIDs = `#${IdNames}`;

export function create<T extends keyof HTMLElementTagNameMap>(
  key: T,
  { css }: { css?: string } = {}
): HTMLElementTagNameMap[T] {
  const el = document.createElement(key);
  if (css) el.style.cssText = css;
  return el;
}

function get(key: ElementIDs): Element;
function get(key: keyof HTMLElementTagNameMap): Element;
function get(key: string): Element;
function get(key: ElementIDs | keyof HTMLElementTagNameMap | string): Element {
  return document.querySelector(key)!;
}

export { get };

export const createHtml = (html: string) => {
  const range = document.createRange();
  return range.createContextualFragment(html).firstChild as Element;
};
