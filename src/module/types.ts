import { ZAIBATSU } from "./config";
import { dictFromArray } from "./utils/dictFromArray";

export type Skill = (typeof ZAIBATSU.SKILLS)[number];

export const SkillEnum = dictFromArray<Skill>(ZAIBATSU.SKILLS);

export type Characteristic = (typeof ZAIBATSU.CHARACTERISTICS)[number];

export const CharacteristicEnum = dictFromArray<Characteristic>(
  ZAIBATSU.CHARACTERISTICS,
);

export type RetrogenicAdaptation = keyof typeof ZAIBATSU.RETROGENICS;

export const RetrogenicAdaptationEnum = dictFromArray<RetrogenicAdaptation>(
  Object.keys(ZAIBATSU.RETROGENICS),
);

export type EquippedState = (typeof ZAIBATSU.EQUIPPED_STATES)[number];

export const EquippedStateEnum = dictFromArray<EquippedState>(
  ZAIBATSU.EQUIPPED_STATES,
);

export type Weapon = keyof typeof ZAIBATSU.WEAPON_RANGES;

export const WeaponEnum = dictFromArray<Weapon>(
  Object.keys(ZAIBATSU.WEAPON_RANGES),
);

export type WeaponType = (typeof ZAIBATSU.WEAPON_TYPES)[number];

export const WeaponTypeEnum = dictFromArray<WeaponType>(ZAIBATSU.WEAPON_TYPES);

export type ItemType = (typeof ZAIBATSU.ITEM_TYPES)[number];

export const ItemTypeEnum = dictFromArray<ItemType>(ZAIBATSU.ITEM_TYPES);

export type Concept = (typeof ZAIBATSU.CONCEPTS)[number];

export const ConceptEnum = dictFromArray<Concept>(ZAIBATSU.CONCEPTS);

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

export type ConceptDataItem = (typeof ConceptData)[Concept];
