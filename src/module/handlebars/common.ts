// @ts-nocheck

import { templatesPath } from "../utils/path";

export function registerCommonHelpers() {
  Handlebars.registerHelper("template", (path: string) => {
    return templatesPath(path);
  });

  Handlebars.registerHelper("concat", (...args: string[]) => {
    return args.filter((arg) => typeof arg === "string").join("");
  });
}
