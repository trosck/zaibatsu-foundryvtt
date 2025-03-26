console.log("build 23:15:57 GMT+0300 (Moscow Standard Time)");
        const handlebarsTemplates = ["systems/zaibatsu-unofficial/templates/actor/actor-sheet.html","systems/zaibatsu-unofficial/templates/actor/tabs/tab-skills.html","systems/zaibatsu-unofficial/templates/actor/parts/info.html","systems/zaibatsu-unofficial/templates/actor/parts/characteristics.html","systems/zaibatsu-unofficial/templates/actor/icons/svg-characteristic-bg.html","systems/zaibatsu-unofficial/templates/actor/icons/svg-actor-overlay.html","systems/zaibatsu-unofficial/templates/actor/icons/svg-actor-interface-bg.html"];
      

function joinPath(...args) {
  return args.join("/");
}

const SYSTEM_NAME = "zaibatsu-unofficial";
const SYSTEM_FOLDER = joinPath("systems", SYSTEM_NAME);
const ACTOR_TYPE = {
  AGENT: "agent",
  NPC: "npc"
};
const CONCEPTS = [
  "Affirist",
  "Burakumin",
  "FreelanceCop",
  "Dealer",
  "Detective",
  "Killer",
  "Kuruma",
  "MartialArtsMaster",
  "Ninja",
  "Technician",
  "OrganTrader",
  "Samurai",
  "Salaryman",
  "SoftJockey",
  "SpecialForces",
  "StreetSurgeon"
];
const SKILLS = [
  "Bujutsu",
  "Explosives",
  "Jujutsu",
  "Karate",
  "Aiming",
  "Shooting",
  "HeavyWeapons",
  "Gambling",
  "Bureaucracy",
  "Bribes",
  "Commerce",
  "Revelry",
  "Leadership",
  "Fake",
  "Medicine",
  "Mechanics",
  "Communicators",
  "Computers",
  "SecuritySystems",
  "Electronics",
  "UrbanSurvival",
  "GravityTransport",
  "Streetwise",
  "GroundTransport",
  "Intelligence",
  "Investigation"
];
const CHARACTERISTICS = ["str", "dex", "end", "int", "edu", "soc"];
const ZAIBATSU = {
  SYSTEM_NAME,
  CHARACTERISTICS,
  SYSTEM_FOLDER,
  ACTOR_TYPE,
  CONCEPTS,
  SKILLS
};

const CharacteristicEnum = ZAIBATSU.CHARACTERISTICS.reduce(
  (acc, key) => {
    acc[key] = key;
    return acc;
  },
  {}
);

class BaseData extends foundry.abstract.TypeDataModel {
}

const { StringField, SchemaField, NumberField } = foundry.data.fields;
class CharacterData extends BaseData {
  static defineSchema() {
    const schema = {};
    schema.age = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0
    });
    schema.gender = new StringField({
      required: true,
      blank: true,
      trim: true
    });
    schema.concept = new StringField({
      required: true,
      trim: true,
      blank: true,
      choices: ZAIBATSU.CONCEPTS
    });
    schema.boss = new StringField({
      required: true,
      trim: true,
      blank: true
    });
    schema.armor = new SchemaField({
      value: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        step: 1
      }),
      max: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        max: 9
      }),
      mod: new NumberField({
        required: false,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0
      })
    });
    schema.weight = new SchemaField({
      value: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        step: 1
      }),
      max: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 8,
        min: 8,
        max: 9
      })
    });
    schema.characteristics = new SchemaField({
      strength: makeCharacteristicField(CharacteristicEnum.str),
      dexterity: makeCharacteristicField(CharacteristicEnum.dex),
      endurance: makeCharacteristicField(CharacteristicEnum.end),
      intelligence: makeCharacteristicField(CharacteristicEnum.int),
      education: makeCharacteristicField(CharacteristicEnum.edu),
      social: makeCharacteristicField(CharacteristicEnum.soc)
    });
    schema.shock = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0
    });
    schema.skills;
    return schema;
  }
}
function makeCharacteristicField(key) {
  return new SchemaField({
    key: new StringField({
      required: true,
      blank: true,
      initial: key,
      trim: true
    }),
    value: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 1,
      min: 1,
      max: 15
    }),
    damage: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0
    })
  });
}

function templatesPath(...args) {
  return joinPath(ZAIBATSU.SYSTEM_FOLDER, "templates", ...args);
}
function assetsPath(...args) {
  return joinPath(ZAIBATSU.SYSTEM_FOLDER, "assets", ...args);
}

class ZaibatsuActor extends Actor {
  async _preCreate(data, options, userId) {
    const result = await super._preCreate(data, options, userId);
    const source = {
      "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS
    };
    if (this.type === ZAIBATSU.ACTOR_TYPE.AGENT) {
      source.img = assetsPath("images", "default", "agent.png");
      source["prototypeToken.displayBars"] = CONST.TOKEN_DISPLAY_MODES.ALWAYS;
    }
    if (this.type === ZAIBATSU.ACTOR_TYPE.NPC) {
      source.img = assetsPath("images", "default", "npc.png");
      source["prototypeToken.displayBars"] = CONST.TOKEN_DISPLAY_MODES.OWNER;
    }
    await this.updateSource(source);
    return result;
  }
}

function registerHandlebarsHelpers() {
  Handlebars.registerHelper("template", (path) => {
    return joinPath(ZAIBATSU.SYSTEM_FOLDER, "templates", path);
  });
  Handlebars.registerHelper("localizeConcept", (concept) => {
    if (!concept) return concept;
    return game.i18n.localize(`concepts.${concept}.name`);
  });
  Handlebars.registerHelper("localizeConcept", (concept, { hash }) => {
    return game.i18n.localize(`concepts.${concept || "-"}.${hash.key}`);
  });
  Handlebars.registerHelper(
    "localizeCharacteristic",
    (characteristic, key) => {
      return game.i18n.localize(`characteristics.${characteristic}.${key}`);
    }
  );
  Handlebars.registerHelper("concat", (...args) => {
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

class ZaibatsuActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 900,
      height: 780,
      resizable: false,
      classes: ["zaibatsu", "sheet", "actor"],
      template: templatesPath("actor", "actor-sheet.html"),
      scrollY: [".skills"],
      tabs: [
        {
          navSelector: ".sheet__navigation-container",
          contentSelector: ".actor-sheet__main-body",
          initial: "skills"
        }
      ]
    });
  }
  async getData(options) {
    const context = await super.getData(options);
    context.system = context.document.system;
    context.CONFIG = CONFIG;
    return context;
  }
}

function useCss(fileName) {
  const head = document.querySelector("head");
  if (!head) return;
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", fileName);
  link.setAttribute("media", "all");
  head.append(link);
}

registerHandlebarsHelpers();
Hooks.once("init", () => {
  CONFIG.ZAIBATSU = ZAIBATSU;
  CONFIG.Actor.documentClass = ZaibatsuActor;
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(ZAIBATSU.SYSTEM_NAME, ZaibatsuActorSheet, {
    types: ["agent"],
    label: "Agent Sheet",
    makeDefault: true
  });
  Actors.registerSheet(ZAIBATSU.SYSTEM_NAME, ZaibatsuActorSheet, {
    types: ["npc"],
    label: "NPC Sheet",
    makeDefault: false
  });
  Object.assign(CONFIG.Actor.dataModels, {
    agent: CharacterData,
    npc: CharacterData
  });
  CONFIG.Actor.trackableAttributes = {
    // @ts-ignore
    agent: {
      bar: ["characteristics.endurance", "shock"],
      value: []
    },
    // @ts-ignore
    npc: {
      bar: ["characteristics.endurance", "shock"],
      value: []
    }
  };
  CONFIG.fontDefinitions["SynteticAsrocuus"] = {
    editor: true,
    fonts: [
      {
        url: [
          joinPath(ZAIBATSU.SYSTEM_FOLDER, "fonts", "SynteticAsrocuus.otf")
        ]
      }
    ]
  };
  useCss(joinPath(ZAIBATSU.SYSTEM_FOLDER, "styles", "index.css"));
  loadTemplates(handlebarsTemplates);
});
