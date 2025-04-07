// @ts-nocheck

import { ZAIBATSU } from "../config";
import { templatesPath } from "../utils/path";

const ACCORDION = {
  skills: false,
  retrogenics: false,
};

export class ZaibatsuActorSheet extends ActorSheet {
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
          contentSelector: ".actor-sheet__navigation-body",
          initial: "info",
        },
      ],
    });
  }

  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);

    context.system = context.document.system;
    context.CONFIG = CONFIG;

    context.unlearnedSkills = this.getUnlearnedSkills(context.document);
    context.unlearnedRetrogenics = this.getUnlearnedRetrogenics(
      context.document,
    );

    return context;
  }

  public activateListeners(html: JQuery): void {
    super.activateListeners(html);

    html.find(".info-container__list").hide();
    html
      .find(".info-container__learn")
      .on("click", this._toggleAccordion.bind(this));
  }

  public async _onSubmit(event: Event) {
    event.preventDefault();
    await this.actor.update({ "system.isInitialized": true });
  }

  private async _toggleAccordion(event: Event): Promise<void> {
    const target = <HTMLElement>event.currentTarget;
    const type = target.dataset?.accordionType;

    if (!Object.keys(ACCORDION).includes(type)) {
      throw new Error("Wrong accordin type: " + type);
    }

    const accordion = this.element.find(
      `.info-container__list[data-accordion-type="${type}"]`,
    );

    accordion.slideToggle(200);
  }

  private getLearnedSkills(actor: Actor) {
    return Object.keys(actor.system.skills);
  }

  private getUnlearnedSkills(actor: Actor) {
    const learnedSkills = new Set(this.getLearnedSkills(actor));
    return ZAIBATSU.SKILLS.filter((skill) => !learnedSkills.has(skill));
  }

  private getLearnedRetrogenics(actor: Actor): string[] {
    return actor.system.retrogenicAdaptations;
  }

  private getUnlearnedRetrogenics(actor: Actor): typeof ZAIBATSU.RETROGENICS {
    const learnedRetrogenics = this.getLearnedRetrogenics(actor);

    if (!learnedRetrogenics.length) {
      return ZAIBATSU.RETROGENICS;
    }

    const retrogenics = { ...ZAIBATSU.RETROGENICS };
    for (const retrogenic of learnedRetrogenics) {
      delete retrogenics[retrogenic];
    }

    return retrogenics;
  }
}
