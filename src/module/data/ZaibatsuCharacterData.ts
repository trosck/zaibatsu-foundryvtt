import { ZAIBATSU } from "../config";
import { CharacteristicEnum, SkillEnum } from "../types";
import { ZaibatsuBaseData } from "./ZaibatsuBaseData";

const {
  StringField,
  SchemaField,
  NumberField,
  ArrayField,
  ObjectField,
  BooleanField,
} = foundry.data.fields;
export class ZaibatsuCharacterData extends ZaibatsuBaseData {
  static defineSchema() {
    const schema = super.defineSchema();

    /**
     * Indicates whether the actor has been fully initialized.
     * During initialization, the player must:
     * 1. Roll for character attributes
     * 2. Enter character name, age, and gender
     * 3. Select a character concept from the predefined list
     * @type {BooleanField}
     * @default false
     */
    schema.isInitialized = new BooleanField({ initial: false });

    // Character's age in years (must be positive integer)
    schema.age = new NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 0,
      min: 0,
    });

    // Gender identity (free-form text field)
    schema.gender = new StringField({
      required: true,
      blank: true,
      trim: true,
    });

    // Character concept/archetype from predefined list
    schema.concept = new StringField({
      required: true,
      trim: true,
      blank: true,
      choices: ZAIBATSU.CONCEPTS,
    });

    // Employer/organization details
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

    // Core character attributes (STR, DEX, END, INT, EDU, SOC)
    schema.characteristics = new SchemaField({
      [CharacteristicEnum.str]: makeCharacteristicField(),
      [CharacteristicEnum.dex]: makeCharacteristicField(),
      [CharacteristicEnum.end]: makeCharacteristicField(),
      [CharacteristicEnum.int]: makeCharacteristicField(),
      [CharacteristicEnum.edu]: makeCharacteristicField(),
      [CharacteristicEnum.soc]: makeCharacteristicField(),
    });

    // Skill proficiencies with initial values
    schema.skills = new ObjectField({
      initial: {
        [SkillEnum.Karate]: 0,
        [SkillEnum.Bujutsu]: 0,
        [SkillEnum.Jujutsu]: 0,
        [SkillEnum.Shooting]: 0,
        [SkillEnum.GroundTransport]: 0,
      },
    });

    // Available points for skill upgrade
    schema.skillPoints = new NumberField({ initial: 0 });

    // Available points for retrogenic enhancements
    schema.retrogenicPoints = new NumberField({ initial: 20 });

    schema.retrogenicAdaptations = new ArrayField(new StringField());

    schema.money = new SchemaField({
      personal: new NumberField({ initial: 0 }),
      corporate: new NumberField({ initial: 0 }),
    });

    return schema;
  }
}

// Factory for creating characteristic fields (value + damage tracking)
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
