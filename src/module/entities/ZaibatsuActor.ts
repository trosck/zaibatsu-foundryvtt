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
    const result: boolean = await super._preCreate(data, options, userId);

    const source = {
      "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS,
      "prototypeToken.displayBars": CONST.TOKEN_DISPLAY_MODES.OWNER,
    };

    if (this.type === ZAIBATSU.ACTOR_TYPE.AGENT) {
      source.img = assetsPath("images", "default", "agent.jpg");
    }

    if (this.type === ZAIBATSU.ACTOR_TYPE.NPC) {
      source.img = assetsPath("images", "default", "npc.jpg");
    }

    this.updateSource(source);

    return result;
  }

  /**
   * Calculates all derived values for the actor
   * Automatically called by Foundry when data changes
   */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Inventory management system
    this.system.derived = {
      inventory: {
        limit: this._calculateInventoryLimit(), // Max capacity based on STR
        load: this._calculateInventoryLoad(), // Current carried weight
      },
    };
  }

  /**
   * Determines inventory slot limit
   * @returns Number - Base 8 slots, 9 if STR >= 10
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
   * Sums sizes of all carried items
   * @returns Number - Total inventory load
   */
  private _calculateInventoryLoad() {
    return this.items.reduce((total: number, item: ZaibatsuItem) => {
      const itemSize = item.system?.size ?? 0;
      return total + itemSize;
    }, 0);
  }

  /**
   * Gets full characteristic data object
   * @param charName - Characteristic enum key
   * @returns Object with value/damage properties
   */
  private getCharacteristic(charName: typeof CharacteristicEnum) {
    return this.system.characteristics[charName];
  }

  /**
   * Gets base value of characteristic (before damage)
   * @param charName - Characteristic enum key
   * @returns Number - Raw characteristic value
   */
  private getCharacteristicValue(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).value;
  }

  /**
   * Gets current damage to characteristic
   * @param charName - Characteristic enum key
   * @returns Number - Current damage points
   */
  private getCharacteristicDamage(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).damage;
  }

  /**
   * Calculates effective characteristic value
   * @param charName - Characteristic enum key
   * @returns Number - Base value minus damage
   */
  private getCharacteristicTotalValue(charName: typeof CharacteristicEnum) {
    const value = this.getCharacteristicValue(charName);
    const damage = this.getCharacteristicDamage(charName);
    return value - damage;
  }
}
