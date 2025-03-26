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

const CHARACTERISTICS = <const>["str", "dex", "end", "int", "edu", "soc"];

export const ZAIBATSU = {
  SYSTEM_NAME,
  CHARACTERISTICS,
  SYSTEM_FOLDER,
  ACTOR_TYPE,
  CONCEPTS,
  SKILLS,
};
