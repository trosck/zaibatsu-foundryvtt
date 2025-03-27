import { ZAIBATSU } from "./module/config";
import { CharacterData } from "./module/data/character";
import { ZaibatsuActor } from "./module/entities/ZaibatsuActor";
import registerHandlebarsHelpers from "./module/handlebars/handlebars";
import { ZaibatsuActorSheet } from "./module/sheets/ZaibatsuActorSheet";
import { joinPath } from "./module/utils/joinPath";
import { useCss } from "./module/utils/useCss";

registerHandlebarsHelpers();

Hooks.once("init", () => {
  // CONFIG.debug.hooks = true;

  // @ts-ignore
  CONFIG.ZAIBATSU = ZAIBATSU;

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

  /**
   * Models
   */
  Object.assign(CONFIG.Actor.dataModels, {
    agent: CharacterData,
    npc: CharacterData,
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
});
