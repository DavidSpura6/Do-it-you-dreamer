export function create<T extends keyof HTMLElementTagNameMap>(
  key: T
): HTMLElementTagNameMap[T] {
  return document.createElement(key);
}
