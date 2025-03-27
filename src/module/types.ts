import { ZAIBATSU } from "./config";
import { dictFromArray } from "./utils/dictFromArray";

export type Skill = (typeof ZAIBATSU.SKILLS)[number];

export const SkillEnum = dictFromArray<Skill>(ZAIBATSU.SKILLS);

export type Characteristic = (typeof ZAIBATSU.CHARACTERISTICS)[number];

export const CharacteristicEnum = dictFromArray<Characteristic>(
  ZAIBATSU.CHARACTERISTICS,
);
