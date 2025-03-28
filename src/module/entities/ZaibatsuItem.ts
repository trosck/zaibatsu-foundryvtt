// @ts-nocheck

import { assetsPath } from "../utils/path";

export class ZaibatsuItem extends Item {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);

    await this.updateSource({
      img: assetsPath("images", "weapons", `${this.system.weaponType}.png`),
    });

    return result;
  }
}
