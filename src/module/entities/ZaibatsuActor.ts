// @ts-nocheck

import { ZAIBATSU } from "../config";
import { CharacteristicEnum } from "../types";
import { assetsPath } from "../utils/path";
import { ZaibatsuItem } from "./ZaibatsuItem";

export class ZaibatsuActor extends Actor {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result = await super._preCreate(data, options, userId);

    const source = {
      "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS,
      "prototypeToken.displayBars": CONST.TOKEN_DISPLAY_MODES.OWNER,
    };

    if (this.type === ZAIBATSU.ACTOR_TYPE.AGENT) {
      source.img = assetsPath("images", "default", "agent.jpg");
    } else if (this.type === ZAIBATSU.ACTOR_TYPE.NPC) {
      source.img = assetsPath("images", "default", "npc.jpg");
    }

    this.updateSource(source);
    return result;
  }

  /**
   * Calculates derived data for the actor
   * Called automatically when actor data changes
   */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Inventory capacity calculations
    this.system.derived = {
      inventory: {
        limit: this._calculateInventoryLimit(), // Max carrying capacity
        load: this._calculateInventoryLoad(), // Current carried weight
      },
    };
  }

  /**
   * Determines inventory capacity based on Strength
   * @returns Number of inventory slots available
   */
  private _calculateInventoryLimit() {
    const defaultLimit = 8;

    const strength = this.getCharacteristicValue(CharacteristicEnum.str);

    if (strength >= 10) {
      return 9;
    }

    return defaultLimit;
  }

  /**
   * Calculates total inventory load from carried items
   * @returns Sum of all item sizes
   */
  private _calculateInventoryLoad() {
    return this.items.reduce((total: number, item: ZaibatsuItem) => {
      const itemSize = item.system?.size ?? 0;
      return total + itemSize;
    }, 0);
  }

  /**
   * Gets characteristic data object
   * @param charName - Characteristic enum value
   * @returns Full characteristic data
   */
  private getCharacteristic(charName: typeof CharacteristicEnum) {
    return this.system.characteristics[charName];
  }

  /**
   * Gets base characteristic value
   * @param charName - Characteristic enum value
   * @returns Raw characteristic value
   */
  private getCharacteristicValue(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).value;
  }

  /**
   * Gets current damage to characteristic
   * @param charName - Characteristic enum value
   * @returns Damage points
   */
  private getCharacteristicDamage(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).damage;
  }

  /**
   * Calculates effective characteristic value
   * @param charName - Characteristic enum value
   * @returns Current value minus damage
   */
  private getCharacteristicTotalValue(charName: typeof CharacteristicEnum) {
    const value = this.getCharacteristicValue(charName);
    const damage = this.getCharacteristicDamage(charName);
    return value - damage;
  }
}
