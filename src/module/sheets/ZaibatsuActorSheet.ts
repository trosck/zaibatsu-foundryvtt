// @ts-nocheck

import { ZAIBATSU } from "../config";
import { templatesPath } from "../utils/path";

// Tracks open/closed state of accordion sections
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
      scrollY: [
        ".actor-sheet__main-body--content",
        ".form-init__group--concept-body",
      ],
      tabs: [
        {
          navSelector: ".sheet__navigation-container",
          contentSelector: ".actor-sheet__navigation-body",
          initial: "info",
        },
      ],
    });
  }

  /**
   * Stores results of characteristic dice rolls
   * @property {string} results - Formatted roll results as text
   * @property {number[]} diceGroups - Roll results grouped in pairs
   */
  private characteristicRolls = {
    diceGroups: [],
    showRollButton: true,
  };

  /**
   * Prepares data for template rendering
   * @param options - Sheet rendering options
   * @returns Context data for template
   */
  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);

    // Shortcut references
    context.system = context.document.system;
    context.CONFIG = CONFIG;

    // Only load unlearned skills for uninitialized characters
    if (!context.system.isInitialized) {
      context.characteristicRolls = this.characteristicRolls;
      context.unlearnedSkills = this.getUnlearnedSkills(context.document);
      context.unlearnedRetrogenics = this.getUnlearnedRetrogenics(
        context.document,
      );
    }

    return context;
  }

  /**
   * Sets up event listeners
   * @param html - jQuery reference to sheet HTML
   */
  public activateListeners(html: JQuery): void {
    super.activateListeners(html);

    // Initialize accordions as hidden
    html.find(".info-container__list").hide();

    // Set up event handlers
    html
      .find(".info-container__learn")
      .on("click", this._toggleAccordion.bind(this));

    html
      .find(".form-init__group--concept-item")
      .on("click", this._onClickConcept.bind(this));

    html
      .find(".roll-section__roll-attributes")
      .on("click", this._onRollAttributes.bind(this));
  }

  /**
   * Handles form submission
   * @param event - Form submit event
   */
  public async _onSubmit(event: Event) {
    event.preventDefault();

    const target = <HTMLElement>event.target;
    const isForm = target?.nodeName === "FORM";

    if (!target || !isForm) {
      return;
    }

    const formData = new FormData(target);

    const characteristics = {};
    for (let i = 0; i < 6; i++) {
      const key = formData.get(`characteristicRolls.${i}.key`);
      const value = formData.get(`characteristicRolls.${i}.value`);

      characteristics[key] = {};
      characteristics[key].value = value;
    }

    await this.actor.update({
      "name": this.actor.name,
      "system.age": this.actor.system.age,
      "system.gender": this.actor.system.gender,
      "system.concept": this.actor.system.concept,
      "system.characteristics": characteristics,
      "system.isInitialized": true,
    });
  }

  /**
   * Handles concept selection
   * @param event - Click event
   */
  public async _onClickConcept(event: Event) {
    event.preventDefault();

    const target = <HTMLElement>event.currentTarget;
    const concept = target.dataset.concept;

    await this.actor.update({
      "system.concept": concept,
    });
  }

  /**
   * Toggles accordion sections
   * @param event - Click event
   */
  private async _toggleAccordion(event: Event): Promise<void> {
    const target = <HTMLElement>event.currentTarget;
    const type = target.dataset?.accordionType;

    if (!Object.keys(ACCORDION).includes(type)) {
      throw new Error("Invalid accordion type: " + type);
    }

    const accordion = this.element.find(
      `.info-container__list[data-accordion-type="${type}"]`,
    );

    accordion.slideToggle(200); // Animated toggle
  }

  /**
   * Handles attribute rolling (12d6)
   * @param event - Click event
   */
  private async _onRollAttributes(event: Event) {
    event.preventDefault();

    $(event.target).hide();

    const roll = new Roll("12d6");
    await roll.evaluate();
    await roll.toMessage({
      rollMode: foundry.CONST.DICE_ROLL_MODES.SELF,
      flavor: game.i18n.localize("sheet.actor.statsGeneration.results"),
    });

    // Destructure dice results
    const {
      terms: [{ results }],
    } = roll;

    // Process results in pairs (2d6 per characteristic)
    const diceResults = [];
    for (let i = 0; i < results.length; i += 2) {
      const firstDice = results[i].result;
      const secondDice = results[i + 1].result;
      const result = firstDice + secondDice;

      this.characteristicRolls.diceGroups.push({
        title: `${firstDice} + ${secondDice} = ${result}`,
        result,
      });
    }

    this.characteristicRolls.results = diceResults.join(", ");
    this.characteristicRolls.showRollButton = false;

    /**
     * wait for dice animation
     */
    await new Promise((resolve) => setTimeout(resolve, 1500));

    this.render();
  }

  /**
   * Gets list of learned skills
   * @param actor - Target actor
   * @returns Array of skill names
   */
  private getLearnedSkills(actor: Actor) {
    return Object.keys(actor.system.skills);
  }

  /**
   * Gets list of available unlearned skills
   * @param actor - Target actor
   * @returns Filtered array of skills
   */
  private getUnlearnedSkills(actor: Actor) {
    const learnedSkills = new Set(this.getLearnedSkills(actor));
    return ZAIBATSU.SKILLS.filter((skill) => !learnedSkills.has(skill));
  }

  /**
   * Gets learned retrogenic adaptations
   * @param actor - Target actor
   * @returns Array of adaptation IDs
   */
  private getLearnedRetrogenics(actor: Actor): string[] {
    return actor.system.retrogenicAdaptations;
  }

  /**
   * Gets available unlearned retrogenics
   * @param actor - Target actor
   * @returns Filtered retrogenics object
   */
  private getUnlearnedRetrogenics(actor: Actor): typeof ZAIBATSU.RETROGENICS {
    const learnedRetrogenics = this.getLearnedRetrogenics(actor);

    if (!learnedRetrogenics.length) {
      return ZAIBATSU.RETROGENICS;
    }

    // Clone and remove learned retrogenics
    const retrogenics = { ...ZAIBATSU.RETROGENICS };
    for (const retrogenic of learnedRetrogenics) {
      delete retrogenics[retrogenic];
    }

    return retrogenics;
  }
}
