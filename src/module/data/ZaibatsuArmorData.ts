import { ZaibatsuItemData } from "./ZaibatsuItemData";

const { StringField, SchemaField, NumberField, ArrayField, ObjectField } =
  foundry.data.fields;

export class ZaibatsuArmorData extends ZaibatsuItemData {
  static defineSchema() {
    const schema = super.defineSchema();

    schema.armorProtection = new NumberField({ initial: 0 });

    return schema;
  }
}
