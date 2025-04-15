import { ZAIBATSU } from "../config";
import { ConcealmentEnum } from "../types";
import { ZaibatsuItemData } from "./ZaibatsuItemData";

const { StringField, SchemaField, NumberField, ArrayField, ObjectField } =
  foundry.data.fields;

export class ZaibatsuWeaponData extends ZaibatsuItemData {
  static defineSchema() {
    const schema = super.defineSchema();

    /**
     * Base damage dice roll representation (e.g. "3d6", "2d6+1")
     * @type {StringField}
     */
    schema.damage = new StringField({ initial: "2d6" });

    /**
     * Maximum capacity of weapon's magazine/clip
     * @type {NumberField}
     */
    schema.magazineSize = new NumberField({ initial: 0 });

    /**
     * Cost to fully reload the weapon in currency
     * @type {NumberField}
     */
    schema.magazineCost = new NumberField({ initial: 0 });

    /**
     * Classification of weapon (e.g. "pistol", "rifle", "melee")
     * @type {StringField}
     * @see WeaponEnum
     */
    schema.weaponType = new StringField({
      initial: ZAIBATSU.WEAPON_TYPES[0],
      choices: ZAIBATSU.WEAPON_TYPES,
    });

    /**
     * Current amount of ammunition loaded
     * @type {NumberField}
     */
    schema.ammo = new NumberField({ initial: 0 });

    /**
     * Physical length of weapon
     * @type {NumberField}
     */
    schema.length = new NumberField({ initial: 0 });

    /**
     * Array of possible fire rates (shots per action)
     * Example: [1] for single-shot, [1,3] for single/burst, [1,3,5] for multi-mode
     * @type {ArrayField<NumberField>}
     */
    schema.fireRate = new ArrayField(new NumberField({ initial: 1 }));

    /**
     * Level of concealment for the weapon
     * This indicates how easily the weapon can be hidden or concealed.
     * @type {StringField}
     */
    schema.concealment = new StringField({
      initial: ConcealmentEnum.pocket,
    });

    return schema;
  }
}
