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
  SYSTEM_NAME,
  RETROGENICS,
  CHARACTERISTICS,
  SYSTEM_FOLDER,
  ACTOR_TYPE,
  CONCEPTS,
  SKILLS,
};
