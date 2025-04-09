// @ts-nocheck

export function registerLocalizeHelpers() {
  Handlebars.registerHelper("localizeConcept", (concept: string, { hash }) => {
    if (!concept) {
      return "";
    }

    return game.i18n.localize(`concepts.${concept}.${hash.key}`);
  });

  Handlebars.registerHelper(
    "localizeCharacteristic",
    (characteristic: string, key: string) => {
      return game.i18n.localize(`characteristics.${characteristic}.${key}`);
    },
  );

  Handlebars.registerHelper("localizeSkill", (id: string, key: string) => {
    return game.i18n.localize(`skills.${id}.${key}`);
  });

  Handlebars.registerHelper("localizeRetrogenic", (id: string, key: string) => {
    return game.i18n.localize(`retrogenics.${id}.${key}`);
  });

  Handlebars.registerHelper("localizeWeaponType", (type: string) => {
    return game.i18n.localize(`weaponType.${type}`);
  });
}
