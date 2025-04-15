// @ts-nocheck

import { ZAIBATSU } from "../config";
import { ItemTypeEnum } from "../types";
import { assetsPath } from "../utils/path";

/**
 * Base item class for Zaibatsu system items
 * Implements factory pattern to create specific item types
 */
export class ZaibatsuItem extends Item {
  /**
   * Constructs item with factory pattern
   * @param item - Item data
   * @param options - Creation options
   */
  constructor(item, options) {
    super(item, options);

    // Factory method - returns specialized item instances
    if (this.constructor === ZaibatsuItem) {
      switch (item.type) {
        case ItemTypeEnum.weapon:
          return new ZaibatsuWeaponItem(item, options);
        case ItemTypeEnum.armor:
          return new ZaibatsuArmorItem(item, options);
      }
    }
  }

  /**
   * Checks if item uses default system image
   * @returns True if image is default Foundry or system placeholder
   */
  private isDefaultImage() {
    const isDefaultFoundryImage =
      this.img === foundry.documents.BaseItem.DEFAULT_ICON;
    const isDefaultZaibatsuImage = this.img.includes(ZAIBATSU.SYSTEM_FOLDER);

    return isDefaultFoundryImage || isDefaultZaibatsuImage;
  }
}

/**
 * @see ZaibatsuWeaponData
 */
class ZaibatsuWeaponItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result = await super._preCreate(data, options, userId);

    if (this.isDefaultImage()) {
      this.updateSource({
        img: assetsPath("images", "weapons", `${this.system.weaponType}.png`),
      });
    }

    return result;
  }

  async _onUpdate(changed: object, options: object, userId: string) {
    await super._onUpdate(changed, options, userId);

    // Update image if weapon type changed and using default
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

/**
 * @see ZaibatsuArmorData
 */
class ZaibatsuArmorItem extends ZaibatsuItem {
  protected async _preCreate(
    data: object,
    options: object,
    userId: User,
  ): Promise<boolean | void> {
    const result = await super._preCreate(data, options, userId);

    // Set default armor image if none specified
    if (this.isDefaultImage()) {
      this.updateSource({
        img: assetsPath("images", "armor.png"),
      });
    }

    return result;
  }
}
