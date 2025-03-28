// @ts-nocheck

import { templatesPath } from "../utils/path";

export class ZaibatsuItemSheet extends ItemSheet {
  static get defaultOptions(): ActorSheet.Options {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 900,
      height: 780,
      resizable: false,
      classes: ["zaibatsu", "sheet", "actor"],
      template: templatesPath("actor", "sheet.html"),
      scrollY: [".actor-sheet__main-body--content"],
      tabs: [
        {
          navSelector: ".sheet__navigation-container",
          contentSelector: ".actor-sheet__main-body",
          initial: "skills",
        },
      ],
    });
  }

  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);
    context.system = context.document.system;
    context.CONFIG = CONFIG;
    return context;
  }
}
