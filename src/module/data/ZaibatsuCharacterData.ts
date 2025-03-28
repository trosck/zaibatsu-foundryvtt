import { ZAIBATSU } from "../config";
import { CharacteristicEnum, SkillEnum } from "../types";
import { ZaibatsuBaseData } from "./ZaibatsuBaseData";

const { StringField, SchemaField, NumberField, ArrayField, ObjectField } =
  foundry.data.fields;

export class ZaibatsuCharacterData extends ZaibatsuBaseData {
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

    schema.employer = new SchemaField({
      name: new StringField({
        required: true,
        trim: true,
        blank: true,
        initial: "",
      }),
      rank: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 1,
        min: 0,
        step: 1,
      }),
      experience: new NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 0,
        min: 0,
        step: 1,
      }),
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
      [CharacteristicEnum.str]: makeCharacteristicField(),
      [CharacteristicEnum.dex]: makeCharacteristicField(),
      [CharacteristicEnum.end]: makeCharacteristicField(),
      [CharacteristicEnum.int]: makeCharacteristicField(),
      [CharacteristicEnum.edu]: makeCharacteristicField(),
      [CharacteristicEnum.soc]: makeCharacteristicField(),
    });

    schema.skills = new ObjectField({
      initial: {
        [SkillEnum.Karate]: 0,
        [SkillEnum.Bujutsu]: 0,
        [SkillEnum.Jujutsu]: 0,
        [SkillEnum.Shooting]: 0,
        [SkillEnum.GroundTransport]: 0,
      },
    });

    schema.retrogenicPoints = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
    });

    schema.retrogenicAdaptations = new ArrayField(
      new StringField({ required: true }),
    );

    return schema;
  }
}

function makeCharacteristicField() {
  return new SchemaField({
    value: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 1,
      min: 0,
      max: 15,
    }),

    damage: new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0,
      max: 15,
    }),
  });
}
