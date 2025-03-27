// @ts-nocheck

export function registerLocalizeHelpers() {
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
}
