import registerHandlebarsHelpers from "./module/handlebars";

import { ZAIBATSU } from "./module/config";
import { joinPath } from "./module/utils/joinPath";
import { useCss } from "./module/utils/useCss";

import { ZaibatsuActor } from "./module/entities/ZaibatsuActor";
import { ZaibatsuActorSheet } from "./module/sheets/ZaibatsuActorSheet";
import { ZaibatsuItemSheet } from "./module/sheets/ZaibatsuItemSheet";
import { ZaibatsuItem } from "./module/entities/ZaibatsuItem";
import { ZaibatsuCharacterData } from "./module/data/ZaibatsuCharacterData";
import { ZaibatsuWeaponData } from "./module/data/ZaibatsuWeaponData";
import { ItemTypeEnum } from "./module/types";
import { ZaibatsuArmorData } from "./module/data/ZaibatsuArmorData";
import { registerHooks } from "./module/hooks";

Hooks.once("init", () => {
  // CONFIG.debug.hooks = true;

  // @ts-ignore
  CONFIG.ZAIBATSU = ZAIBATSU;

  // @ts-ignore
  game[ZAIBATSU.SYSTEM_NAME] = {
    ZaibatsuActor,
    ZaibatsuItem,
  };

  /**
   * Actors
   */
  CONFIG.Actor.documentClass = ZaibatsuActor;

  Actors.unregisterSheet("core", ActorSheet);

  Actors.registerSheet(ZAIBATSU.SYSTEM_NAME, ZaibatsuActorSheet, {
    types: ["agent"],
    label: "Agent Sheet",
    makeDefault: true,
  });

  Actors.registerSheet(ZAIBATSU.SYSTEM_NAME, ZaibatsuActorSheet, {
    types: ["npc"],
    label: "NPC Sheet",
    makeDefault: false,
  });

  Object.assign(CONFIG.Actor.dataModels, {
    agent: ZaibatsuCharacterData,
    npc: ZaibatsuCharacterData,
  });

  CONFIG.Actor.trackableAttributes = {
    // @ts-ignore
    agent: {
      bar: ["characteristics.endurance", "shock"],
      value: [],
    },
    // @ts-ignore
    npc: {
      bar: ["characteristics.endurance", "shock"],
      value: [],
    },
  };

  /**
   * Items
   */
  CONFIG.Item.documentClass = ZaibatsuItem;

  Items.unregisterSheet("core", ItemSheet);

  Items.registerSheet(ZAIBATSU.SYSTEM_NAME, ZaibatsuItemSheet, {
    makeDefault: true,
    label: "Item Sheet",
  });

  /* Load Schemas */
  Object.assign(CONFIG.Item.dataModels, {
    [ItemTypeEnum.weapon]: ZaibatsuWeaponData,
    [ItemTypeEnum.armor]: ZaibatsuArmorData,
  });

  CONFIG.fontDefinitions["SynteticAsrocuus"] = {
    editor: true,
    fonts: [
      {
        url: [
          joinPath(ZAIBATSU.SYSTEM_FOLDER, "fonts", "SynteticAsrocuus.otf"),
        ],
      },
    ],
  };

  useCss(joinPath(ZAIBATSU.SYSTEM_FOLDER, "styles", "index.css"));

  // @ts-ignore - see rollup.config.js
  loadTemplates(handlebarsTemplates);

  registerHooks();
  registerHandlebarsHelpers();
});
