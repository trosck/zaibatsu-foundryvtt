import { ZAIBATSU } from "./config";

export type SKill = (typeof ZAIBATSU.SKILLS)[number];

export type Characteristic = (typeof ZAIBATSU.CHARACTERISTICS)[number];

export const CharacteristicEnum = ZAIBATSU.CHARACTERISTICS.reduce(
  (acc, key) => {
    acc[key] = key;
    return acc;
  },
  {} as Record<Characteristic, Characteristic>,
);
