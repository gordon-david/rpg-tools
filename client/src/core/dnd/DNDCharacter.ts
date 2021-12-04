export const AbilityName = {
  strength: "Strength",
  dexterity: "Dexterity",
  intelligence: "Intelligence",
  constitution: "Constitution",
  charisma: "Charisma",
  wisdom: "Wisdom",
  none: 'none'
}

export class AttributeBonus {
  value: number
  source: object | null

  constructor(value?: number, source?: object) {
    this.value = value ? value : 0
    this.source = source ? source : null
  }
}

export class Ability {
  name: string
  baseValue: number
  bonuses: AttributeBonus[]
  constructor(name: string, { baseValue = 10, bonuses = [] }: { baseValue?: number, bonuses?: AttributeBonus[] } = {}) {
    this.name = name
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
      name: this.name,
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

export const SkillName = {
  none: "none",
  acrobatics: "acrobatics",
  animal_handling: "animal_handling",
  arcana: "arcana",
  athletics: "athletics",
  deception: "deception",
  history: "history",
  insight: "insight",
  intimidation: "intimidation",
  investigation: "investigation",
  medicine: "medicine",
  nature: "nature",
  perception: 'perception',
  performance: "performance",
  persuasion: "persuasion",
  religion: "religion",
  sleight_of_hand: "sleight_of_hand",
  stealth: "stealth",
  survival: "survival"
}
export class Skill {
  name: string
  bonuses: AttributeBonus[]
  isProficient: boolean
  derivedAbility: Ability
  derivedProficiency: ProficiencyBonus
  constructor(name: string, {
    bonuses = [],
    isProficient = false,
    derivedAbility = new Ability(AbilityName.none),
    derivedProficiency = new ProficiencyBonus()
  } = {}) {
    this.name = name
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
      name: this.name,
      derivedAbility: this.derivedAbility.name
    }
  }
}

export class Save {
  name: string
  bonuses: AttributeBonus[]
  isProficient: boolean
  derivedAbility: Ability
  derivedProficiency: ProficiencyBonus
  constructor(name: string, {
    bonuses = [],
    isProficient = false,
    derivedAbility = new Ability(AbilityName.none),
    derivedProficiency = new ProficiencyBonus()
  } = {}) {
    this.name = name
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
      name: this.name,
      derivedAbility: this.derivedAbility.name
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
    this.abilities = {
      strength: new Ability("strength"),
      dexterity: new Ability("dexterity"),
      intelligence: new Ability("intelligence"),
      constitution: new Ability("constitution"),
      charisma: new Ability("charisma"),
      wisdom: new Ability("wisdom"),
    }

    this.skills = {
      acrobatics: new Skill("acrobatics"),
      animal_handling: new Skill("animal_handling"),
      arcana: new Skill("arcana"),
      athletics: new Skill("athletics"),
      deception: new Skill("deception"),
      history: new Skill("history"),
      insight: new Skill("insight"),
      intimidation: new Skill("intimidation"),
      investigation: new Skill("investigation"),
      medicine: new Skill("medicine"),
      nature: new Skill("nature"),
      perception: new Skill("perception"),
      performance: new Skill("performance"),
      persuasion: new Skill("persuasion"),
      religion: new Skill("religino"),
      sleight_of_hand: new Skill("sleight_of_hand"),
      stealth: new Skill("stealth"),
      survival: new Skill("survival"),
    }

    this.saves = {
      strength: new Save("strength"),
      dexterity: new Save("dexterity"),
      intelligence: new Save("intelligence"),
      constitution: new Save("constitution"),
      charisma: new Save("charisma"),
      wisdom: new Save("wisdom"),
    }

    for (let s in AbilityName) {
      if (s !== AbilityName.none)
        this.saves[s] = new Save(s)
    }

    this.proficiencyBonus = new ProficiencyBonus()

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

    // map proficiency bonus to saves and skills
    for (let i in this.saves) {
      this.saves[i].derivedProficiency = this.proficiencyBonus
    }
    for (let i in this.skills) {
      this.skills[i].derivedProficiency = this.proficiencyBonus
    }

    // map saves to abilites
    for (let i in this.saves) {
      this.saves[i].derivedAbility = this.abilities[i]
    }
  }

  serialize(){
    let wrapper: any = {}
    wrapper.abilities = {}

    for(let a in this.abilities){
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
