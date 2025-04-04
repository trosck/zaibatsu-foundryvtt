// @ts-nocheck

import { ZAIBATSU } from "../config";
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

  private isDefaultImage() {
    const isDefaultFoundryImage =
      this.img === foundry.documents.BaseItem.DEFAULT_ICON;

    const isDefaultZaibatsuImage = this.img.includes(ZAIBATSU.SYSTEM_FOLDER);

    return isDefaultFoundryImage || isDefaultZaibatsuImage;
  }
}

class ZaibatsuWeaponItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);

    if (this.isDefaultImage()) {
      this.updateSource({
        img: assetsPath("images", "weapons", `${this.system.weaponType}.png`),
      });
    }

    return result;
  }

  async _onUpdate(changed: object, options: object, userId: string) {
    await super._onUpdate(changed, options, userId);

    if (changed?.system?.weaponType && this.isDefaultImage()) {
      await this.update({
        img: assetsPath(
          "images",
          "weapons",
          `${changed.system.weaponType}.png`,
        ),
      });
    }
  }
}

class ZaibatsuArmorItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result: boolean = await super._preCreate(data, options, userId);

    if (this.isDefaultImage()) {
      this.updateSource({
        img: assetsPath("images", "armor.png"),
      });
    }

    return result;
  }
}
