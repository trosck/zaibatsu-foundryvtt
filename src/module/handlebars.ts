// @ts-nocheck

import { ZAIBATSU } from "./config";
import { joinPath } from "./utils/joinPath";

export default function registerHandlebarsHelpers() {
  Handlebars.registerHelper("template", (path: string) => {
    return joinPath(ZAIBATSU.SYSTEM_FOLDER, "templates", path);
  });

  Handlebars.registerHelper("localizeConcept", (concept: string) => {
    if (!concept) return concept;

    return game.i18n.localize(`concepts.${concept}.name`);
  });

  Handlebars.registerHelper("localizeConcept", (concept: string, { hash }) => {
    return game.i18n.localize(`concepts.${concept || "-"}.${hash.key}`);
  });

  Handlebars.registerHelper(
    "localizeCharacteristic",
    (characteristic: string, key: string) => {
      return game.i18n.localize(`characteristics.${characteristic}.${key}`);
    },
  );

  Handlebars.registerHelper("concat", (...args: string[]) => {
    return args.filter((arg) => typeof arg === "string").join("");
  });

  Handlebars.registerHelper("createSelectOption", ({ hash }) => {
    const { name, model, value, tooltip } = hash;
    const selected = model === value ? "selected" : "";
    const dataTooltip = tooltip ? `data-tooltip="${tooltip}"` : "";
    return `
        <option value="${value}" ${selected} ${dataTooltip}>
          ${name}
        </option>
      `;
  });

  Handlebars.registerHelper("disableAfterSelect", ({ hash }) => {
    const { value, allowForGm } = hash;

    if (allowForGm && game.user?.isGM) {
      return "";
    }

    return value ? "disabled" : "";
  });
}
