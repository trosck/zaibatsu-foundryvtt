// @ts-nocheck

import { ZAIBATSU } from "../config";
import { ConceptData } from "../types";
import { registerCommonHelpers } from "./common";
import { registerLocalizeHelpers } from "./localize";
import { registerTooltipHelpers } from "./tooltip";

export default function registerHandlebarsHelpers() {
  registerCommonHelpers();
  registerTooltipHelpers();
  registerLocalizeHelpers();

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

  /**
   * if <select /> has value disables it
   * allowForGm=true allows change select value for GM
   */
  Handlebars.registerHelper("disableAfterSelect", ({ hash }) => {
    const { value, allowForGm } = hash;

    if (allowForGm && game.user?.isGM) {
      return "";
    }

    return value ? "disabled" : "";
  });

  Handlebars.registerHelper("disableIfFalse", (value) => {
    if (!value) {
      return "disabled";
    }
  });

  Handlebars.registerHelper("getConceptSkills", (value: string) => {
    return ConceptData[value]?.skill;
  });
}
