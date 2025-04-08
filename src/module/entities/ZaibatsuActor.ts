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

  prepareDerivedData() {
    super.prepareDerivedData();

    this.system.derived = {
      inventory: {
        limit: this._calculateInventoryLimit(),
        load: this._calculateInventoryLoad(),
      },
    };
  }

  private _calculateInventoryLimit() {
    const defaultLimit = 8;

    const strength = this.getCharacteristicValue(CharacteristicEnum.str);
    if (strength >= 10) {
      return 9;
    }

    return defaultLimit;
  }

  private _calculateInventoryLoad() {
    return this.items.reduce((total: number, item: ZaibatsuItem) => {
      const itemSize = item.system?.size ?? 0;
      return total + itemSize;
    }, 0);
  }

  private getCharacteristic(charName: typeof CharacteristicEnum) {
    return this.system.characteristics[charName];
  }

  private getCharacteristicValue(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).value;
  }

  private getCharacteristicDamage(charName: typeof CharacteristicEnum) {
    return this.getCharacteristic(charName).damage;
  }

  private getCharacteristicTotalValue(charName: typeof CharacteristicEnum) {
    const value = this.getCharacteristicValue(charName);
    const damage = this.getCharacteristicDamage(charName);
    return value - damage;
  }
}
