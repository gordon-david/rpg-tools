// export const AbilityName = {
//   strength: "Strength",
//   dexterity: "Dexterity",
//   intelligence: "Intelligence",
//   constitution: "Constitution",
//   charisma: "Charisma",
//   wisdom: "Wisdom",
//   none: 'none'
// }

export class AttributeBonus {
  value: number
  source: object | null

  constructor(value?: number, source?: object) {
    this.value = value ? value : 0
    this.source = source ? source : null
  }
}

export class Ability {
  key: string
  displayName: string
  baseValue: number
  bonuses: AttributeBonus[]
  constructor(key: string, displayName: string, { baseValue = 10, bonuses = [] }: { baseValue?: number, bonuses?: AttributeBonus[] } = {}) {
    this.key = key
    this.displayName = displayName
    this.baseValue = baseValue
    this.bonuses = bonuses
  }

  get finalValue() {
    return this.baseValue + this.bonuses.reduce((sum, e) => sum + e.value, 0);
  }

  get modifier() {
    return Math.floor(this.finalValue / 2) - 5;
  }

  serialize() {
    return {
      key: this.key,
      displayName: this.displayName,
      baseValue: this.baseValue,
      bonuses: this.bonuses,
      finalValue: this.finalValue,
      modifier: this.modifier,
    }
  }
}

export class ProficiencyBonus {
  _value: number
  constructor({ value = 0 } = {}) {
    this._value = value
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (typeof value !== "number") {
      console.log("prof bonus value NAN")
      return
    }
    if (value < 0) {
      console.log('prof bonus value is negative')
      return
    }
    this._value = value;
  }
}

// export const SkillName = {
//   none: "none",
//   acrobatics: "acrobatics",
//   animal_handling: "animal_handling",
//   arcana: "arcana",
//   athletics: "athletics",
//   deception: "deception",
//   history: "history",
//   insight: "insight",
//   intimidation: "intimidation",
//   investigation: "investigation",
//   medicine: "medicine",
//   nature: "nature",
//   perception: 'perception',
//   performance: "performance",
//   persuasion: "persuasion",
//   religion: "religion",
//   sleight_of_hand: "sleight_of_hand",
//   stealth: "stealth",
//   survival: "survival"
// }
export class Skill {
  key: string
  displayName: string
  bonuses: AttributeBonus[]
  isProficient: boolean
  derivedAbility: Ability
  derivedProficiency: ProficiencyBonus

  constructor(key: string,
    displayName: string,
    derivedAbility: Ability,
    derivedProficiency: ProficiencyBonus,
    {
      bonuses = [],
      isProficient = false,
    }: {
      bonuses?: any[],
      isProficient?: boolean
    } = {}) {
    this.key = key
    this.displayName = displayName
    this.bonuses = bonuses
    this.isProficient = isProficient
    this.derivedAbility = derivedAbility
    this.derivedProficiency = derivedProficiency
  }

  // calculated properties
  get finalValue() {
    return this.derivedAbility.finalValue +
      this.bonuses.reduce((sum, e) => e.value + sum, 0)
  }
  get modifier() {
    const profBonus = (this.isProficient) ? this.derivedProficiency.value : 0
    return Math.floor(this.finalValue / 2) - 5 + profBonus;
  }
  serialize() {
    return {
      bonuses: this.bonuses,
      isProficient: this.isProficient,
      finalValue: this.finalValue,
      modifier: this.modifier,
      key: this.key,
      displayName: this.displayName,
      derivedAbility: this.derivedAbility.key
    }
  }
}

export class Save {
  key: string
  displayName: string
  bonuses: AttributeBonus[]
  isProficient: boolean
  derivedAbility: Ability
  derivedProficiency: ProficiencyBonus
  constructor(key: string,
    displayName: string,
    derivedAbility: Ability,
    derivedProficiency: ProficiencyBonus,
    {
      bonuses = [],
      isProficient = false,
    } = {}) {
    this.key = key
    this.displayName = displayName
    this.bonuses = bonuses
    this.isProficient = isProficient
    this.derivedAbility = derivedAbility
    this.derivedProficiency = derivedProficiency
  }

  // derived data
  get finalValue() {
    const profBonus = (this.isProficient) ? this.derivedProficiency.value : 0
    return this.derivedAbility.finalValue +
      this.bonuses.reduce((sum, e) => e.value + sum, 0) + profBonus
  }
  get modifier() {
    return Math.floor(this.finalValue / 2) - 5;
  }
  serialize() {
    return {
      bonuses: this.bonuses,
      isProficient: this.isProficient,
      finalValue: this.finalValue,
      modifier: this.modifier,
      name: this.key,
      derivedAbility: this.derivedAbility.key
    };
  }
}

export class DNDCharacter {

  abilities: {
    strength: Ability,
    dexterity: Ability,
    intelligence: Ability,
    constitution: Ability,
    charisma: Ability,
    wisdom: Ability,
    [key: string]: Ability
  }

  skills: {
    acrobatics: Skill,
    animal_handling: Skill,
    arcana: Skill,
    athletics: Skill,
    deception: Skill,
    history: Skill,
    insight: Skill,
    intimidation: Skill,
    investigation: Skill,
    medicine: Skill,
    nature: Skill,
    perception: Skill,
    performance: Skill,
    persuasion: Skill,
    religion: Skill,
    sleight_of_hand: Skill,
    stealth: Skill,
    survival: Skill,
    [key: string]: Skill
  }


  saves: {
    strength: Save,
    dexterity: Save,
    intelligence: Save,
    constitution: Save,
    charisma: Save,
    wisdom: Save,
    [key: string]: Save
  }

  proficiencyBonus: ProficiencyBonus

  constructor() {
    this.proficiencyBonus = new ProficiencyBonus()
    this.abilities = {
      strength: new Ability("strength", "Strength"),
      dexterity: new Ability("dexterity", "Dexterity"),
      intelligence: new Ability("intelligence", "Intelligence"),
      constitution: new Ability("constitution", "Constitution"),
      charisma: new Ability("charisma", "Charisma"),
      wisdom: new Ability("wisdom", "Wisdom"),
    }

    this.skills = {
      acrobatics: new Skill("acrobatics", "Acrobatics", this.abilities.dexterity, this.proficiencyBonus),
      animal_handling: new Skill("animal_handling", "Animal Handling", this.abilities.wisdom, this.proficiencyBonus),
      arcana: new Skill("arcana", "Arcana", this.abilities.intelligence, this.proficiencyBonus),
      athletics: new Skill("athletics", "Athletics", this.abilities.strength, this.proficiencyBonus),
      deception: new Skill("deception", "Deception", this.abilities.charisma, this.proficiencyBonus),
      history: new Skill("history", "History", this.abilities.intelligence, this.proficiencyBonus),
      insight: new Skill("insight", "Insight", this.abilities.wisdom, this.proficiencyBonus),
      intimidation: new Skill("intimidation", "Intimidation", this.abilities.charisma, this.proficiencyBonus),
      investigation: new Skill("investigation", "Investigation", this.abilities.intelligence, this.proficiencyBonus),
      medicine: new Skill("medicine", "Medicine", this.abilities.wisdom, this.proficiencyBonus),
      nature: new Skill("nature", "Nature", this.abilities.intelligence, this.proficiencyBonus),
      perception: new Skill("perception", "Perception", this.abilities.wisdom, this.proficiencyBonus),
      performance: new Skill("performance", "Performance", this.abilities.charisma, this.proficiencyBonus),
      persuasion: new Skill("persuasion", "Persuasion", this.abilities.charisma, this.proficiencyBonus),
      religion: new Skill("religion", "Religion", this.abilities.intelligence, this.proficiencyBonus),
      sleight_of_hand: new Skill("sleight_of_hand", "Sleight of Hand", this.abilities.dexterity, this.proficiencyBonus),
      stealth: new Skill("stealth", "Stealth", this.abilities.dexterity, this.proficiencyBonus),
      survival: new Skill("survival", "Survival", this.abilities.wisdom, this.proficiencyBonus),
    }

    this.saves = {
      strength: new Save("strength", "Strength", this.abilities.strength, this.proficiencyBonus),
      dexterity: new Save("dexterity", "Dexterity", this.abilities.dexterity, this.proficiencyBonus),
      intelligence: new Save("intelligence", "Intelligence", this.abilities.intelligence, this.proficiencyBonus),
      constitution: new Save("constitution", "Constitution", this.abilities.constitution, this.proficiencyBonus),
      charisma: new Save("charisma", "Charisma", this.abilities.charisma, this.proficiencyBonus),
      wisdom: new Save("wisdom", "Wisdom", this.abilities.wisdom, this.proficiencyBonus),
    }

    // map skills to abilities
    this.skills.acrobatics.derivedAbility = this.abilities.dexterity
    this.skills.animal_handling.derivedAbility = this.abilities.wisdom
    this.skills.arcana.derivedAbility = this.abilities.intelligence
    this.skills.athletics.derivedAbility = this.abilities.strength
    this.skills.deception.derivedAbility = this.abilities.charisma
    this.skills.history.derivedAbility = this.abilities.intelligence
    this.skills.insight.derivedAbility = this.abilities.wisdom
    this.skills.intimidation.derivedAbility = this.abilities.charisma
    this.skills.investigation.derivedAbility = this.abilities.intelligence
    this.skills.medicine.derivedAbility = this.abilities.wisdom
    this.skills.nature.derivedAbility = this.abilities.intelligence
    this.skills.perception.derivedAbility = this.abilities.wisdom
    this.skills.performance.derivedAbility = this.abilities.charisma
    this.skills.persuasion.derivedAbility = this.abilities.charisma
    this.skills.religion.derivedAbility = this.abilities.intelligence
    this.skills.sleight_of_hand.derivedAbility = this.abilities.dexterity
    this.skills.stealth.derivedAbility = this.abilities.dexterity
    this.skills.survival.derivedAbility = this.abilities.wisdom

    // map proficiency bonus to skills
    for (let i in this.skills) {
      this.skills[i].derivedProficiency = this.proficiencyBonus
    }
  }

  serialize() {
    let wrapper: any = {}
    wrapper.abilities = {}

    for (let a in this.abilities) {
      wrapper.abilities[a] = this.abilities[a].serialize()
    }

    wrapper.saves = {}
    for (let s in this.saves) {
      wrapper.saves[s] = this.saves[s].serialize()
    }

    wrapper.skills = {}
    for (let s in this.skills) {
      wrapper.skills[s] = this.skills[s].serialize()
    }

    wrapper.proficiencyBonus = this.proficiencyBonus.value

    return wrapper
  }
}
