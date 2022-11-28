// export const AbilityName = {
//   strength: "Strength",
//   dexterity: "Dexterity",
//   intelligence: "Intelligence",
//   constitution: "Constitution",
//   charisma: "Charisma",
//   wisdom: "Wisdom",
//   none: 'none'
// }

import { Ability } from "./Ability";
import { ProficiencyBonus } from "./ProficiencyBonus";
import { Save } from "./Save";
import { Skill } from "./Skill";

export class DNDCharacter {
  abilities: {
    strength: Ability;
    dexterity: Ability;
    intelligence: Ability;
    constitution: Ability;
    charisma: Ability;
    wisdom: Ability;
    [key: string]: Ability;
  };

  skills: {
    acrobatics: Skill;
    animal_handling: Skill;
    arcana: Skill;
    athletics: Skill;
    deception: Skill;
    history: Skill;
    insight: Skill;
    intimidation: Skill;
    investigation: Skill;
    medicine: Skill;
    nature: Skill;
    perception: Skill;
    performance: Skill;
    persuasion: Skill;
    religion: Skill;
    sleight_of_hand: Skill;
    stealth: Skill;
    survival: Skill;
    [key: string]: Skill;
  };

  saves: {
    strength: Save;
    dexterity: Save;
    intelligence: Save;
    constitution: Save;
    charisma: Save;
    wisdom: Save;
    [key: string]: Save;
  };

  proficiencyBonus: ProficiencyBonus;

  constructor() {
    this.proficiencyBonus = new ProficiencyBonus();
    this.abilities = {
      strength: new Ability("strength", "Strength"),
      dexterity: new Ability("dexterity", "Dexterity"),
      intelligence: new Ability("intelligence", "Intelligence"),
      constitution: new Ability("constitution", "Constitution"),
      charisma: new Ability("charisma", "Charisma"),
      wisdom: new Ability("wisdom", "Wisdom"),
    };

    this.skills = {
      acrobatics: new Skill(
        "acrobatics",
        "Acrobatics",
        this.abilities.dexterity,
        this.proficiencyBonus
      ),
      animal_handling: new Skill(
        "animal_handling",
        "Animal Handling",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
      arcana: new Skill(
        "arcana",
        "Arcana",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      athletics: new Skill(
        "athletics",
        "Athletics",
        this.abilities.strength,
        this.proficiencyBonus
      ),
      deception: new Skill(
        "deception",
        "Deception",
        this.abilities.charisma,
        this.proficiencyBonus
      ),
      history: new Skill(
        "history",
        "History",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      insight: new Skill(
        "insight",
        "Insight",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
      intimidation: new Skill(
        "intimidation",
        "Intimidation",
        this.abilities.charisma,
        this.proficiencyBonus
      ),
      investigation: new Skill(
        "investigation",
        "Investigation",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      medicine: new Skill(
        "medicine",
        "Medicine",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
      nature: new Skill(
        "nature",
        "Nature",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      perception: new Skill(
        "perception",
        "Perception",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
      performance: new Skill(
        "performance",
        "Performance",
        this.abilities.charisma,
        this.proficiencyBonus
      ),
      persuasion: new Skill(
        "persuasion",
        "Persuasion",
        this.abilities.charisma,
        this.proficiencyBonus
      ),
      religion: new Skill(
        "religion",
        "Religion",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      sleight_of_hand: new Skill(
        "sleight_of_hand",
        "Sleight of Hand",
        this.abilities.dexterity,
        this.proficiencyBonus
      ),
      stealth: new Skill(
        "stealth",
        "Stealth",
        this.abilities.dexterity,
        this.proficiencyBonus
      ),
      survival: new Skill(
        "survival",
        "Survival",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
    };

    this.saves = {
      strength: new Save(
        "strength",
        "Strength",
        this.abilities.strength,
        this.proficiencyBonus
      ),
      dexterity: new Save(
        "dexterity",
        "Dexterity",
        this.abilities.dexterity,
        this.proficiencyBonus
      ),
      intelligence: new Save(
        "intelligence",
        "Intelligence",
        this.abilities.intelligence,
        this.proficiencyBonus
      ),
      constitution: new Save(
        "constitution",
        "Constitution",
        this.abilities.constitution,
        this.proficiencyBonus
      ),
      charisma: new Save(
        "charisma",
        "Charisma",
        this.abilities.charisma,
        this.proficiencyBonus
      ),
      wisdom: new Save(
        "wisdom",
        "Wisdom",
        this.abilities.wisdom,
        this.proficiencyBonus
      ),
    };

    // map skills to abilities
    this.skills.acrobatics.derivedAbility = this.abilities.dexterity;
    this.skills.animal_handling.derivedAbility = this.abilities.wisdom;
    this.skills.arcana.derivedAbility = this.abilities.intelligence;
    this.skills.athletics.derivedAbility = this.abilities.strength;
    this.skills.deception.derivedAbility = this.abilities.charisma;
    this.skills.history.derivedAbility = this.abilities.intelligence;
    this.skills.insight.derivedAbility = this.abilities.wisdom;
    this.skills.intimidation.derivedAbility = this.abilities.charisma;
    this.skills.investigation.derivedAbility = this.abilities.intelligence;
    this.skills.medicine.derivedAbility = this.abilities.wisdom;
    this.skills.nature.derivedAbility = this.abilities.intelligence;
    this.skills.perception.derivedAbility = this.abilities.wisdom;
    this.skills.performance.derivedAbility = this.abilities.charisma;
    this.skills.persuasion.derivedAbility = this.abilities.charisma;
    this.skills.religion.derivedAbility = this.abilities.intelligence;
    this.skills.sleight_of_hand.derivedAbility = this.abilities.dexterity;
    this.skills.stealth.derivedAbility = this.abilities.dexterity;
    this.skills.survival.derivedAbility = this.abilities.wisdom;

    // map proficiency bonus to skills
    for (let i in this.skills) {
      this.skills[i].derivedProficiency = this.proficiencyBonus;
    }
  }

  serialize() {
    let wrapper: any = {};
    wrapper.abilities = {};

    for (let a in this.abilities) {
      wrapper.abilities[a] = this.abilities[a].serialize();
    }

    wrapper.saves = {};
    for (let s in this.saves) {
      wrapper.saves[s] = this.saves[s].serialize();
    }

    wrapper.skills = {};
    for (let s in this.skills) {
      wrapper.skills[s] = this.skills[s].serialize();
    }

    wrapper.proficiencyBonus = this.proficiencyBonus.value;

    return wrapper;
  }
}
