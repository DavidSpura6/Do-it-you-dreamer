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

export const get: typeof document.querySelector = (key) => {
  return document.querySelector(key)!;
};

export const createHtml = (html: string) => {
  const range = document.createRange();
  return range.createContextualFragment(html).firstChild as Element;
};
