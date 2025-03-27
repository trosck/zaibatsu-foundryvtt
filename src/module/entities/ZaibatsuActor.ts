// @ts-nocheck

import { ZAIBATSU } from "../config";
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
      source.img = assetsPath("images", "default", "agent.png");
    }

    if (this.type === ZAIBATSU.ACTOR_TYPE.NPC) {
      source.img = assetsPath("images", "default", "npc.png");
    }

    await this.updateSource(source);

    return result;
  }
}
