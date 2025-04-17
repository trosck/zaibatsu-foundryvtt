// @ts-nocheck

import { ZAIBATSU } from "../config";
import {
  Characteristic,
  CharacteristicEnum,
  Concept,
  ConceptData,
  RetrogenicAdaptation,
  RetrogenicAdaptationEnum,
  Skill,
} from "../types";
import { templatesPath } from "../utils/path";

// Tracks open/closed state of accordion sections
const ACCORDION = {
  skills: false,
  retrogenics: false,
};

const INIT_SLIDE = {
  current: 1,
  max: 3,
};

type Accordion = keyof typeof ACCORDION;

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
   * Stores results of stats dice rolls
   */
  private characteristicRolls = {
    diceResults: "",
    availableValues: [],
    showRollButton: true,
    characteristiscs: ZAIBATSU.CHARACTERISTICS.reduce((arr, char) => {
      arr.push({
        key: char,
        value: 0,
      });

      return arr;
    }, []),
  };

  protected async _renderOuter(): Promise<JQuery<HTMLElement>> {
    const html = await super._renderOuter();
    const header = html[0].querySelector(".window-header");

    // Adjust header buttons.
    header.querySelectorAll(".header-button").forEach((button) => {
      if (button.classList.contains("close")) {
        return;
      }

      const label = button.querySelector(":scope > i").nextSibling;

      button.dataset.tooltip = label.textContent;
      button.setAttribute("aria-label", label.textContent);
      button.addEventListener("dblclick", (event) => event.stopPropagation());

      label.remove();
    });

    // Document UUID link.
    const firstButton = header.querySelector(".header-button");
    const idLink = header.querySelector(".document-id-link");
    if (idLink) {
      firstButton?.insertAdjacentElement("beforebegin", idLink);
      idLink.classList.add("pseudo-header-button");
      idLink.dataset.tooltipDirection = "DOWN";
    }

    return html;
  }

  /**
   * Prepares data for template rendering
   * @param options - Sheet rendering options
   * @returns Context data for template
   */
  async getData(options?: Partial<ActorSheet.Options> | undefined) {
    const context = await super.getData(options);

    context.system = context.document.system;
    context.CONFIG = CONFIG;

    if (!context.system.isInitialized) {
      context.characteristicRolls = this.characteristicRolls;
    } else {
      context.untrainedSkills = this.getUntrainedSkills(context.document);
      context.untrainedRetrogenics = this.getUntrainedRetrogenics(
        context.document,
      );
    }

    return context;
  }

  /**
   * Custom render method that preserves scroll positions of specified elements
   * @param {boolean} force - Whether to force a full re-render
   * @param {object} options - Additional rendering options
   */
  async _render(force = false, options = {}) {
    // CSS selector for elements that should maintain their scroll position
    const className = ".save-scroll-state";

    // Object to store current scroll positions
    const scrollPositions = {};

    // Capture current scroll positions of all matching elements
    this.element.find(className).each((i, el) => {
      scrollPositions[el.className] = {
        top: el.scrollTop, // Vertical scroll position
        left: el.scrollLeft, // Horizontal scroll position
      };
    });

    // Execute the parent class's render logic
    await super._render(force, options);

    // Restore scroll positions on the next animation frame
    // Ensures DOM is fully rendered before restoration
    requestAnimationFrame(() => {
      this.element.find(className).each((i, el) => {
        if (scrollPositions[el.className]) {
          el.scrollTop = scrollPositions[el.className].top;
          el.scrollLeft = scrollPositions[el.className].left;
        }
      });
    });

    if (!this.actor.isInitialized) {
      requestAnimationFrame(() => {
        this.showCurrentSlide();
      });
    }
  }

  /**
   * Sets up event listeners
   * @param html - jQuery reference to sheet HTML
   */
  public activateListeners(html: JQuery): void {
    super.activateListeners(html);

    for (const key in ACCORDION) {
      const isShown = ACCORDION[key];
      if (isShown) {
        continue;
      }

      html.find(`.info-container__list[data-accordion-type="${key}"]`).hide();
    }

    // Set up event handlers
    html
      .find(".info-container__learn")
      .on("click", this._onToggleAccordion.bind(this));

    html
      .find(".form-init__group--concept-item")
      .on("click", this._onClickConcept.bind(this));

    html
      .find(".roll-section__roll-attributes")
      .on("click", this._onRollAttributes.bind(this));

    html
      .find(
        ".info-container.skills .info-container__list .info-container__item",
      )
      .on("click", this._onClickSkill.bind(this));

    html
      .find(
        ".info-container.retrogenics .info-container__list .info-container__item",
      )
      .on("click", this._onClickRetrogenic.bind(this));

    html
      .find(".info-container.skills .info-container__body .skill-level")
      .on("click", this._onSkillLevelUp.bind(this));
  }

  /**
   * Handles form submission
   * @param event - Form submit event
   */
  public async _onSubmit(event: Event) {
    super._onSubmit(event);

    if (this.actor.system.isInitialized) {
      INIT_SLIDE.current = 1;
      return;
    }

    const target = <HTMLElement>event.target;
    const isForm = target?.nodeName === "FORM";

    if (!target || !isForm) {
      return;
    }

    if (INIT_SLIDE.current < INIT_SLIDE.max) {
      return this.showNextSlide();
    }

    const formData = new FormData(target);

    const characteristics = {};
    for (const char of this.characteristicRolls.characteristiscs) {
      characteristics[char.key] = {
        value: parseInt(char.value),
        damage: 0,
      };
    }

    const education = characteristics[CharacteristicEnum.edu].value;
    const skillPoints = this._calculateSkillPoints(education);

    const conceptSkill = formData.get("concept.skill");

    await this.actor.update({
      "system.concept": this.actor.system.concept,
      "system.characteristics": characteristics,

      "system.skillPoints": skillPoints,
      "system.skills": {
        [conceptSkill]: 1,
      },

      "system.isInitialized": true,
    });
  }

  private showNextSlide() {
    const currentSlide = this.element.find(
      `.form-init__slide[data-slide-index="${INIT_SLIDE.current}"]`,
    );

    currentSlide.hide();

    const nextSlide = this.element.find(
      `.form-init__slide[data-slide-index="${++INIT_SLIDE.current}"]`,
    );

    nextSlide.show();
  }

  private showCurrentSlide() {
    for (let i = 1; i <= INIT_SLIDE.max; i++) {
      const slide = this.element.find(
        `.form-init__slide[data-slide-index="${i}"]`,
      );

      if (i === INIT_SLIDE.current) {
        slide.show();
      } else {
        slide.hide();
      }
    }
  }

  protected _onChangeInput(event: JQuery.ChangeEvent): Promise<void | object> {
    const target = <HTMLElement>event.target;
    const name = target.getAttribute("name");

    if (name?.includes("characteristicRolls")) {
      return this._onCharacteristicRolls(event);
    } else if (name === "concept.skill") {
      return;
    } else {
      super._onChangeInput(event);
    }
  }

  private async _onCharacteristicRolls(event: Event) {
    const target = <HTMLSelectElement>event.target;

    const char = target.dataset.key;
    const value = parseInt(target.value);

    const valueIndex = this.characteristicRolls.availableValues.indexOf(value);
    this.characteristicRolls.availableValues.splice(valueIndex, 1);

    const charItem = this.characteristicRolls.characteristiscs.find(
      ({ key }) => key === char,
    );

    charItem.value = value;

    await this.actor.update({
      "system.characteristics": {
        [char]: { value },
      },
    });
  }

  /**
   * Calculates available skill points based on Education characteristic
   * Uses tiered thresholds with linear progression (every 3 points = +1 skill point)
   *
   * Skill Point Thresholds:
   * - 1-3 EDU: 1 point
   * - 4-6 EDU: 2 points
   * - 7-9 EDU: 3 points
   * - 10+ EDU: 4 points
   *
   * @param {number} education - Education characteristic value
   * @returns {number} Skill points between 1 and 4
   */
  private _calculateSkillPoints(education: number): number {
    // Linear tiered progression (1 point per 3 EDU)
    return Math.min(Math.floor((education + 2) / 3), 4);
  }

  /**
   * Handles concept selection
   * @param event - Click event
   */
  private async _onClickConcept(event: Event) {
    event.preventDefault();

    const target = <HTMLElement>event.currentTarget;
    const concept = <Concept>target.dataset.concept;

    await this.actor.update({
      "system.concept": concept,
    });

    const conceptSelect = this.element.find('select[name="concept.skill"]');
    conceptSelect.val(ConceptData[concept]?.skill[0]);
  }

  /**
   * Handles skill selection in the progression interface
   * Automatically closes skills accordion when no points remain
   *
   * @param {Event} event - Click event from skill selection button
   * @returns {Promise<void>}
   */
  private async _onClickSkill(event: Event) {
    event.preventDefault();

    const target = <HTMLElement>event.currentTarget;
    const skill = <Skill>target.dataset.key;

    const newValue = this.actor.system.skillPoints - 1;

    await this.actor.update({
      "system.skillPoints": newValue,
      "system.skills": {
        [skill]: 1,
      },
    });

    if (!newValue) {
      this.toggleAccordion("skills");
    }
  }

  /**
   * Processes retrogenic adaptation purchase in progression UI
   * Closes retrogenics panel when budget is exhausted
   *
   * @param {Event} event - Click event from adaptation button
   * @returns {Promise<void>}
   */
  private async _onClickRetrogenic(event: Event) {
    event.preventDefault();

    const target = <HTMLElement>event.currentTarget;
    const retrogenic = <RetrogenicAdaptation>target.dataset.key;
    const retrogenicPrice = ZAIBATSU.RETROGENICS[retrogenic];

    const newValue = this.actor.system.retrogenicPoints - retrogenicPrice;

    await this.actor.update({
      "system.retrogenicPoints": newValue,
      "system.retrogenicAdaptations":
        this.actor.system.retrogenicAdaptations.concat(retrogenic),
    });

    if (!newValue) {
      this.toggleAccordion("retrogenics");
    }
  }

  /**
   * Increases existing skill level when upgrade points are available
   * Prevents action if character has no remaining skill points
   *
   * @param {Event} event - Click event from skill upgrade button
   * @returns {Promise<void>}
   */
  private async _onSkillLevelUp(event: Event) {
    event.preventDefault();

    if (!this.actor.system.skillPoints) {
      return;
    }

    const target = <HTMLElement>event.currentTarget;
    const skill = <Skill>target.dataset.key;

    await this.actor.update({
      "system.skillPoints": this.actor.system.skillPoints - 1,
      "system.skills": {
        [skill]: this.actor.system.skills[skill] + 1,
      },
    });
  }

  /**
   * Manages accordion section toggles in progression UI
   * Routes click events to the accordion controller
   *
   * @param {Event} event - Click event from accordion header
   * @returns {Promise<void>}
   */
  private _onToggleAccordion(event: Event): Promise<void> {
    event.preventDefault();

    const target = <HTMLElement>event.currentTarget;
    const type = <Accordion>target.dataset?.accordionType;

    if (!type) {
      return;
    }

    this.toggleAccordion(type);
  }

  /**
   * Controls accordion animation and state tracking
   * Validates accordion type before operation
   *
   * @param {Accordion} type - Accordion section identifier
   * @throws {Error} When invalid accordion type provided
   */
  private toggleAccordion(type: Accordion) {
    if (!Object.keys(ACCORDION).includes(type)) {
      throw new Error("Invalid accordion type: " + type);
    }

    const accordion = this.element.find(
      `.info-container__list[data-accordion-type="${type}"]`,
    );

    ACCORDION[type] = !ACCORDION[type];

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

    const diceResults = [];
    // Process results in pairs (2d6 per characteristic)
    for (let i = 0; i < results.length; i += 2) {
      const firstDice = results[i].result;
      const secondDice = results[i + 1].result;
      const result = firstDice + secondDice;

      diceResults.push(`${firstDice} + ${secondDice} = ${result}`);

      this.characteristicRolls.availableValues.push(result);
    }

    this.characteristicRolls.diceResults = diceResults.join("; ");
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
  private getTrainedSkills(actor: Actor) {
    return Object.keys(actor.system.skills);
  }

  /**
   * Gets list of available untrained skills
   * @param actor - Target actor
   * @returns Filtered array of skills
   */
  private getUntrainedSkills(actor: Actor) {
    const learnedSkills = new Set(this.getTrainedSkills(actor));
    return ZAIBATSU.SKILLS.filter((skill) => !learnedSkills.has(skill));
  }

  /**
   * Gets learned retrogenic adaptations
   * @param actor - Target actor
   * @returns Array of adaptation IDs
   */
  private getTrainedRetrogenics(actor: Actor): string[] {
    return actor.system.retrogenicAdaptations;
  }

  /**
   * Gets available untrained retrogenics
   * @param actor - Target actor
   * @returns Filtered retrogenics object
   */
  private getUntrainedRetrogenics(actor: Actor): typeof ZAIBATSU.RETROGENICS {
    const learnedRetrogenics = this.getTrainedRetrogenics(actor);

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
