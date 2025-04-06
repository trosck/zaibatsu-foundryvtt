import { ZAIBATSU } from "../config";
import { EquippedStateEnum, WeaponEnum } from "../types";
import { ZaibatsuBaseData } from "./ZaibatsuBaseData";

const { StringField, SchemaField, NumberField, ArrayField, ObjectField } =
  foundry.data.fields;

export class ZaibatsuBaseItemData extends ZaibatsuBaseData {
  static defineSchema() {
    const schema = super.defineSchema();

    /**
     * Detailed description of the item
     * @type {StringField}
     */
    schema.description = new StringField({ initial: "" });

    /**
     * Base price in currency units
     * @type {NumberField}
     */
    schema.price = new NumberField({ initial: 0, min: 0 });

    return schema;
  }
}

export class ZaibatsuItemData extends ZaibatsuBaseItemData {
  static defineSchema() {
    const schema = super.defineSchema();

    /**
     * Item quantity in inventory and store
     * @type {NumberField}
     */
    schema.quantity = new NumberField({ initial: 1 });

    /**
     * Abstract item size
     * @type {NumberField}
     */
    schema.size = new NumberField({ initial: 0, min: 0 });

    /**
     * Current equipped state/location
     * @type {StringField}
     * @see EquippedStateEnum
     */
    schema.equipped = new StringField({
      initial: EquippedStateEnum.backpack,
      choices: ZAIBATSU.EQUIPPED_STATES,
    });

    return schema;
  }
}
