// @ts-nocheck

import { ItemTypeEnum } from "../types";
import { assetsPath } from "../utils/path";

export class ZaibatsuItem extends Item {
  constructor(item, options) {
    super(item, options);

    if (this.constructor === ZaibatsuItem) {
      switch (item.type) {
        case ItemTypeEnum.weapon:
          return new ZaibatsuWeaponItem(item, options);
        case ItemTypeEnum.armor:
          return new ZaibatsuArmorItem(item, options);
      }
    }
  }
}

class ZaibatsuWeaponItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);

    if (isDefaultImage(this.img)) {
      await this.updateSource({
        img: assetsPath("images", "weapons", `${this.system.weaponType}.png`),
      });
    }

    return result;
  }
}

class ZaibatsuArmorItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);

    if (isDefaultImage(this.img)) {
      await this.updateSource({
        img: assetsPath("images", "armor.png"),
      });
    }

    return result;
  }
}

function isDefaultImage(img: string) {
  return img === foundry.documents.BaseItem.DEFAULT_ICON;
}
