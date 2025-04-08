// @ts-nocheck

import { ZAIBATSU } from "../config";

export function registerTooltipHelpers() {
  Handlebars.registerHelper("tooltipCharacteristics", () => {
    let html = `<div class="stats-tooltip-content">`;

    for (const key of ZAIBATSU.CHARACTERISTICS) {
      const name = game.i18n.localize(`characteristics.${key}.full`);
      const desc = game.i18n.localize(`characteristics.${key}.desc`);

      html += `
      <div class="stat-desc-item">
        <strong>${name}</strong>:
        <span>${desc}</span>
      </div>
    `;
    }

    html += `</div>`;

    return html;
  });
}
