// @ts-nocheck

import { ItemTypeEnum, WeaponTypeEnum } from "../types";
import { templatesPath } from "../utils/path";

export class ZaibatsuItemSheet extends ItemSheet {
  static get defaultOptions(): ActorSheet.Options {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 600,
      height: "auto",
      resizable: false,
      classes: ["zaibatsu", "sheet", "item"],
      template: templatesPath("item", "sheet.html"),
    });
  }

  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);
    context.system = context.document.system;
    context.CONFIG = CONFIG;

    context.isWeapon = context.item.type === ItemTypeEnum.weapon;
    context.isArmor = context.item.type === ItemTypeEnum.armor;

    context.isFirearm = [
      WeaponTypeEnum.assaultRifle,
      WeaponTypeEnum.pistol,
      WeaponTypeEnum.rifle,
      WeaponTypeEnum.shotgun,
    ].includes(context.system.weaponType);

    return context;
  }

  /** @override */
  activateListeners(html: JQuery): void {
    super.activateListeners(html);
    this.listenTextEditor(html);
  }

  protected listenTextEditor(html: JQuery) {
    html
      .find('div[contenteditable="true"][data-edit]')
      .on("focusout", this._onSubmit.bind(this));

    html
      .find('div[contenteditable="true"][data-edit]')
      .on("paste", onPasteStripFormatting.bind(this));
  }
}

function onPasteStripFormatting(event) {
  if (event?.originalEvent?.clipboardData?.getData) {
    event.preventDefault();
    const text = event.originalEvent.clipboardData.getData("text/plain");
    window.document.execCommand("insertText", false, text);
  } else if (event?.clipboardData?.getData) {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    window.document.execCommand("insertText", false, text);
  }
}
