// @ts-nocheck

export function itemPilesIntegration() {
  Hooks.once("item-piles-ready", async function () {
    // https://github.com/fantasycalendar/FoundryVTT-ItemPiles/blob/master/docs/api.md#addsystemintegration
    game.itempiles.API.addSystemIntegration({
      VERSION: "1.0.0",

      // The actor class type is the type of actor that will be used for the default item pile actor that is created on first item drop.
      ACTOR_CLASS_TYPE: "npc",

      // The item quantity attribute is the path to the attribute on items that denote how many of that item that exists
      ITEM_QUANTITY_ATTRIBUTE: "system.quantity",

      // The item price attribute is the path to the attribute on each item that determine how much it costs
      ITEM_PRICE_ATTRIBUTE: "system.price",

      // Item similarities determines how item piles detect similarities and differences in the system
      ITEM_SIMILARITIES: ["name", "type", "weaponType"],

      // Currencies in item piles is a versatile system that can accept actor attributes (a number field on the actor's sheet) or items (actual items in their inventory)
      // In the case of attributes, the path is relative to the "actor.system"
      // In the case of items, it is recommended you export the item with `.toObject()` and strip out any module data
      CURRENCIES: [
        {
          type: "attribute",
          name: "Yen (C)",
          abbreviation: "¥{#}",
          data: {
            path: "system.money.corporate",
          },
          primary: false,
          exchangeRate: 1,
        },
        {
          type: "attribute",
          name: "Yen (P)",
          abbreviation: "¥{#}",
          data: {
            path: "system.money.personal",
          },
          primary: true,
          exchangeRate: 1,
        },
      ],
    });
  });
}
