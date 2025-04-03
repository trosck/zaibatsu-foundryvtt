import { joinPath } from "./utils/joinPath";

const SYSTEM_NAME = <const>"zaibatsu-unofficial";
const SYSTEM_FOLDER = joinPath("systems", SYSTEM_NAME);

const ACTOR_TYPE = <const>{
  AGENT: "agent",
  NPC: "npc",
};

const CONCEPTS = <const>[
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
  "StreetSurgeon",
];

const SKILLS = <const>[
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
  "Investigation",
];

const EQUIPPED_STATES = <const>["backpack", "equipped", "vehicle"];

const WEAPON_RANGES = <const>{
  melee: {
    effective: 2,
    long: 0,
    extreme: 0,
  },
  throwing: {
    effective: 5,
    long: 20,
    extreme: 40,
  },
  pistol: {
    effective: 10,
    long: 40,
    extreme: 80,
  },
  rifle: {
    effective: 100,
    long: 400,
    extreme: 800,
  },
  shotgun: {
    effective: 10,
    long: 40,
    extreme: 80,
  },
  assaultRifle: {
    effective: 50,
    long: 200,
    extreme: 400,
  },
  rocket: {
    effective: 100,
    long: 400,
    extreme: 800,
  },
};

const WEAPON_TYPES = <const>[
  "melee",
  "throwing",
  "pistol",
  "rifle",
  "shotgun",
  "assaultRifle",
  "rocket",
];

const ITEM_TYPES = <const>["weapon", "armor"];

const RETROGENICS = <const>{
  Ambidextrous: 10,
  Amphibian: 5,
  InnerEar: 5,
  SecondSkin: 10,
  RetractableClaws: 10,
  HighPainThreshold: 10,
  Flexibility: 5,
  InsectEyes: 10,
  SleepDeprivator: 5,
  MetabolismSlowdown: 5,
  AnimalEmpathy: 5,
  PoisonImmunity: 5,
  ArtificialEyes: 5,
  CatEyes: 10,
  MacroVision: 5,
  MicroVision: 5,
  Mimicry: 10,
  MuscleMatrix: 15,
  ParabolicHearing: 5,
  SubdermalArmor: 20,
  SubdermalPouch: 5,
  Regeneration: 15,
  SuperLegs: 10,
  SuperArms: 10,
  Transmorph: 20,
  EnhancedRespiratorySystem: 10,
  MetabolismAccelerator: 15,
  PheromoneSense: 5,
  EideticMemory: 5,
  PoisonousFangs: 1,
};

const CHARACTERISTICS = <const>["str", "dex", "end", "int", "edu", "soc"];

export const ZAIBATSU = {
  WEAPON_RANGES,
  WEAPON_TYPES,
  SYSTEM_NAME,
  RETROGENICS,
  EQUIPPED_STATES,
  CHARACTERISTICS,
  SYSTEM_FOLDER,
  ACTOR_TYPE,
  ITEM_TYPES,
  CONCEPTS,
  SKILLS,
};
