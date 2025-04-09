import { ZAIBATSU } from "../config";
import { CharacteristicEnum, ConceptDataItem, SkillEnum } from "../types";
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

    /**
     * Derived data fields for computed properties.
     * These fields are calculated dynamically and not stored directly in the database.
     */
    schema.derived = new SchemaField({
      /**
       * Inventory tracking system.
       * Contains calculated values for capacity and current usage.
       */
      inventory: new SchemaField({
        /**
         * Maximum inventory capacity.
         * Determined by character strength.
         */
        limit: new NumberField(),

        /**
         * Current inventory load.
         * Represents the sum of all carried items sizes.
         */
        load: new NumberField(),
      }),

      /**
       * Character concept configuration that defines gameplay bonuses.
       * Maps each character archetype to its mechanical benefits.
       *
       * @example
       * // For 'Samurai' concept:
       * {
       *   characteristic: "end", // Main characteristic (Endurance)
       *   skill: ["Intelligence"]      // +1 to Intelligence skill
       * }
       */
      concept: new SchemaField({
        /**
         * Primary characteristic for the concept that should be maximized.
         * Player should prioritize this as highest characteristic
         *
         * @see {@link CharacteristicEnum}
         */
        characteristic: new StringField(),

        /**
         * Skill proficiency bonuses granted by the concept.
         * - Provides +1 rank to selected skill (player's choice if multiple)
         * - Only one skill bonus can be active
         *
         * @example
         * ["HeavyWeapons", "Explosives"] // Special Forces can choose either
         *
         * @see {@link SkillEnum}
         */
        skill: new ArrayField(new StringField()),
      }),

      /**
       * Rank of the character, representing their level based on experience.
       *
       * @type {Number}
       * @default 1
       */
      rank: new NumberField({ initial: 1 }),
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
