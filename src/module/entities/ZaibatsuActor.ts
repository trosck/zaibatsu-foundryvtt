// @ts-nocheck

import { ZAIBATSU } from "../config";
import { CharacteristicEnum } from "../types";
import { assetsPath } from "../utils/path";

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

  private getCharacteristicValue(charName: typeof CharacteristicEnum) {
    return this.system.characteristics[charName].value;
  }

  get inventoryLimit() {
    const defaultLimit = 8;

    const strength = this.getCharacteristicValue(CharacteristicEnum.str);
    if (strength >= 10) {
      return 9;
    }

    return defaultLimit;
  }

  // TODO real inventory size
  get inventoryCount() {
    return this.items.size;
  }
}
