import { ZAIBATSU } from "./config";
import { dictFromArray } from "./utils/dictFromArray";

// Available character skills
export type Skill = (typeof ZAIBATSU.SKILLS)[number];

// Maps skill names to their corresponding values
export const SkillEnum = dictFromArray<Skill>(ZAIBATSU.SKILLS);

// Core character attributes like strength, dexterity, etc
export type Characteristic = (typeof ZAIBATSU.CHARACTERISTICS)[number];

// Maps characteristic names to their corresponding values
export const CharacteristicEnum = dictFromArray<Characteristic>(
  ZAIBATSU.CHARACTERISTICS,
);

// Genetic modifications that can be applied to characters
export type RetrogenicAdaptation = keyof typeof ZAIBATSU.RETROGENICS;

// Maps retrogenics names to their corresponding values
export const RetrogenicAdaptationEnum = dictFromArray<RetrogenicAdaptation>(
  Object.keys(ZAIBATSU.RETROGENICS),
);

// Possible states for equipped items (held, stored, etc)
export type EquippedState = (typeof ZAIBATSU.EQUIPPED_STATES)[number];

// Maps equipment states to their corresponding values
export const EquippedStateEnum = dictFromArray<EquippedState>(
  ZAIBATSU.EQUIPPED_STATES,
);

// Available weapon categories with defined range properties
export type Weapon = keyof typeof ZAIBATSU.WEAPON_RANGES;

// Maps weapon names to their corresponding values
export const WeaponEnum = dictFromArray<Weapon>(
  Object.keys(ZAIBATSU.WEAPON_RANGES),
);

// Classifications of different weapon styles
export type WeaponType = (typeof ZAIBATSU.WEAPON_TYPES)[number];

// Maps weapon classifications to their corresponding values
export const WeaponTypeEnum = dictFromArray<WeaponType>(ZAIBATSU.WEAPON_TYPES);

// Categories of items (weapon, armor)
export type ItemType = (typeof ZAIBATSU.ITEM_TYPES)[number];

// Maps item categories to their corresponding values
export const ItemTypeEnum = dictFromArray<ItemType>(ZAIBATSU.ITEM_TYPES);

// Character archetypes/professions
export type Concept = (typeof ZAIBATSU.CONCEPTS)[number];

// Maps character concepts to their corresponding values
export const ConceptEnum = dictFromArray<Concept>(ZAIBATSU.CONCEPTS);

// Defines base characteristics and skills for each character concept
export const ConceptData = <const>{
  [ConceptEnum.Affirist]: {
    characteristic: CharacteristicEnum.soc,
    skill: [SkillEnum.Fake],
  },
  [ConceptEnum.Burakumin]: {
    characteristic: CharacteristicEnum.str,
    skill: [SkillEnum.Bujutsu],
  },
  [ConceptEnum.FreelanceCop]: {
    characteristic: CharacteristicEnum.str,
    skill: [SkillEnum.Bribes],
  },
  [ConceptEnum.Dealer]: {
    characteristic: CharacteristicEnum.int,
    skill: [SkillEnum.Streetwise],
  },
  [ConceptEnum.Detective]: {
    characteristic: CharacteristicEnum.edu,
    skill: [SkillEnum.Investigation],
  },
  [ConceptEnum.Killer]: {
    characteristic: CharacteristicEnum.dex,
    skill: [SkillEnum.Aiming],
  },
  [ConceptEnum.Kuruma]: {
    characteristic: CharacteristicEnum.dex,
    skill: [SkillEnum.GroundTransport],
  },
  [ConceptEnum.MartialArtsMaster]: {
    characteristic: CharacteristicEnum.end,
    skill: [SkillEnum.Karate, SkillEnum.Jujutsu],
  },
  [ConceptEnum.Ninja]: {
    characteristic: CharacteristicEnum.dex,
    skill: [SkillEnum.SecuritySystems],
  },
  [ConceptEnum.Technician]: {
    characteristic: CharacteristicEnum.edu,
    skill: [SkillEnum.Mechanics, SkillEnum.Electronics],
  },
  [ConceptEnum.OrganTrader]: {
    characteristic: CharacteristicEnum.dex,
    skill: [SkillEnum.UrbanSurvival],
  },
  [ConceptEnum.Samurai]: {
    characteristic: CharacteristicEnum.end,
    skill: [SkillEnum.Intelligence],
  },
  [ConceptEnum.Salaryman]: {
    characteristic: CharacteristicEnum.soc,
    skill: [SkillEnum.Commerce],
  },
  [ConceptEnum.SoftJockey]: {
    characteristic: CharacteristicEnum.int,
    skill: [SkillEnum.Computers],
  },
  [ConceptEnum.SpecialForces]: {
    characteristic: CharacteristicEnum.end,
    skill: [SkillEnum.HeavyWeapons, SkillEnum.Explosives],
  },
  [ConceptEnum.StreetSurgeon]: {
    characteristic: CharacteristicEnum.edu,
    skill: [SkillEnum.Medicine],
  },
};

// Structure of individual concept entries in ConceptData
export type ConceptDataItem = (typeof ConceptData)[Concept];

// How/where items can be concealed on a character
export type ConcealmentType = (typeof ZAIBATSU.CONCEALMENT_TYPES)[number];

// Maps concealment locations to their corresponding values
export const ConcealmentEnum = dictFromArray<ConcealmentType>(
  ZAIBATSU.CONCEALMENT_TYPES,
);
