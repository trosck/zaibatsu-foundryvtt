// @ts-nocheck

import { assetsPath, templatesPath } from "../utils/path";

export function registerCommonHelpers() {
  Handlebars.registerHelper("template", (path: string) => {
    return templatesPath(path);
  });

  Handlebars.registerHelper("asset", (path: string) => {
    return assetsPath(path);
  });

  Handlebars.registerHelper("concat", (...args: string[]) => {
    return args.filter((arg) => typeof arg === "string").join("");
  });

  Handlebars.registerHelper("toJSON", (value) => {
    return JSON.stringify(value);
  });
}
