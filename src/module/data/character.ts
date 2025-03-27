import { ZAIBATSU } from "../config";
import { Characteristic, CharacteristicEnum, SkillEnum } from "../types";
import { BaseData } from "./base";

const { StringField, SchemaField, NumberField, ArrayField } =
  foundry.data.fields;

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

    const SkillSchema = new SchemaField({
      id: new StringField({ required: true }),
      level: new NumberField({ required: true }),
    });

    schema.skills = new ArrayField(SkillSchema, {
      initial: [
        initSkill(SkillEnum.Bujutsu),
        initSkill(SkillEnum.Karate),
        initSkill(SkillEnum.Jujutsu),
        initSkill(SkillEnum.Shooting),
        initSkill(SkillEnum.GroundTransport),
      ],
    });

    schema.retrogenicAdaptations = new ArrayField(
      new StringField({ required: true }),
    );

    return schema;
  }
}

function initSkill(skill: string) {
  return {
    id: skill,
    level: 0,
  };
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
