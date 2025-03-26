import { ZAIBATSU } from "../config";
import { Characteristic, CharacteristicEnum } from "../types";
import { BaseData } from "./base";

const { StringField, SchemaField, NumberField } = foundry.data.fields;

export class CharacterData extends BaseData {
  static defineSchema() {
    const schema: any = {};

    schema.age = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0,
    });

    schema.gender = new StringField({
      required: true,
      blank: true,
      trim: true,
    });

    schema.concept = new StringField({
      required: true,
      trim: true,
      blank: true,
      choices: ZAIBATSU.CONCEPTS,
    });

    schema.boss = new StringField({
      required: true,
      trim: true,
      blank: true,
    });

    schema.armor = new SchemaField({
      value: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        step: 1,
      }),
      max: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        max: 9,
      }),
      mod: new NumberField({
        required: false,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
      }),
    });

    schema.weight = new SchemaField({
      value: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        step: 1,
      }),
      max: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 8,
        min: 8,
        max: 9,
      }),
    });

    schema.characteristics = new SchemaField({
      strength: makeCharacteristicField(CharacteristicEnum.str),
      dexterity: makeCharacteristicField(CharacteristicEnum.dex),
      endurance: makeCharacteristicField(CharacteristicEnum.end),
      intelligence: makeCharacteristicField(CharacteristicEnum.int),
      education: makeCharacteristicField(CharacteristicEnum.edu),
      social: makeCharacteristicField(CharacteristicEnum.soc),
    });

    schema.shock = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0,
    });

    schema.skills;

    return schema;
  }
}

function makeCharacteristicField(key: Characteristic) {
  return new SchemaField({
    key: new StringField({
      required: true,
      blank: true,
      initial: key,
      trim: true,
    }),

    value: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 1,
      min: 1,
      max: 15,
    }),

    damage: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0,
    }),
  });
}
