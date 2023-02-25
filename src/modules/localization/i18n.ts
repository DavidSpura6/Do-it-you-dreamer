import enStrings from "../../locales/en/strings.json";
import csStrings from "../../locales/cs/strings.json";
import { getLocale } from "./getLocale";
// import { getLocale } from "./getLocale";

// export async function loadLocalizations() {
//   const locale = getLocale();
//   console.log(`Using locale: ${locale}`);

//   const module = (await import(`../../locales/${locale}/strings.json`)).default
//   console.log(module);
// }

// loadLocalizations();

let memoizedLocale: "en" | "cs" | null = null;
const getMemoizedLocale = () => {
  if (memoizedLocale) return memoizedLocale;
  const locale = getLocale();
  if (locale !== "en" && locale !== "cs") memoizedLocale = "en";
  memoizedLocale = locale as "en" | "cs";
  return memoizedLocale;
};

const Strings = {
  en: enStrings,
  cs: csStrings,
};

export const getTranslation = () => {
  const locale = getMemoizedLocale();
  return {
    t: (key: StringKey) => Strings[locale][key],
  };
};
