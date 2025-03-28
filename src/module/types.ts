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

export const EquippedStateEnum = dictFromArray<
  (typeof ZAIBATSU.EQUIPPED_STATES)[number]
>(ZAIBATSU.EQUIPPED_STATES);

export type Weapon = keyof typeof ZAIBATSU.WEAPON_RANGES;

export const WeaponEnum = dictFromArray<Weapon>(
  Object.keys(ZAIBATSU.WEAPON_RANGES),
);
