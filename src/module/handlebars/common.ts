// @ts-nocheck

export function registerCommonHelpers() {
  Handlebars.registerHelper("template", (path: string) => {
    return joinPath(ZAIBATSU.SYSTEM_FOLDER, "templates", path);
  });

  Handlebars.registerHelper("concat", (...args: string[]) => {
    return args.filter((arg) => typeof arg === "string").join("");
  });
}
