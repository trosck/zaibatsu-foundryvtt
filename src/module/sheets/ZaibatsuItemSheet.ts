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

  /**
   * Prepares data for the item sheet template
   * @param options - Rendering options
   * @returns Context data for template
   */
  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);

    // Shortcut references
    context.system = context.document.system;
    context.CONFIG = CONFIG;

    // Item type flags for template conditional rendering
    context.isWeapon = context.item.type === ItemTypeEnum.weapon;
    context.isArmor = context.item.type === ItemTypeEnum.armor;

    // Firearm subtype check
    context.isFirearm = [
      WeaponTypeEnum.assaultRifle,
      WeaponTypeEnum.pistol,
      WeaponTypeEnum.rifle,
      WeaponTypeEnum.shotgun,
    ].includes(context.system.weaponType);

    return context;
  }

  activateListeners(html: JQuery): void {
    super.activateListeners(html);
    this.listenTextEditor(html);
  }

  /**
   * Configures content-editable divs as rich text fields
   * @param html
   */
  protected listenTextEditor(html: JQuery) {
    // Handle text editing completion
    html
      .find('div[contenteditable="true"][data-edit]')
      .on("focusout", this._onSubmit.bind(this));

    // Handle paste events with formatting cleanup
    html
      .find('div[contenteditable="true"][data-edit]')
      .on("paste", onPasteStripFormatting.bind(this));
  }
}

/**
 * Handles paste events by stripping formatting
 * @param event - Clipboard paste event
 */
function onPasteStripFormatting(event) {
  const clipboardData =
    event?.originalEvent?.clipboardData || event?.clipboardData;

  if (clipboardData?.getData) {
    event.preventDefault();
    const text = clipboardData.getData("text/plain");
    window.document.execCommand("insertText", false, text);
  }
}
