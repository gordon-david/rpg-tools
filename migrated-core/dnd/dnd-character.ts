import getInitialState from "./dnd-character-initialstate"

export enum AbilityName {
  strength = "Strength",
  dexterity = "Dexterity",
  intelligence = "Intelligence",
  constitution = "Constitution",
  charisma = "Charisma",
  wisdom = "Wisdom",
}

export class AbilityBonusCollection {
  bonuses: AbilityBonus[] = []
  add(bonus: AbilityBonus) {
    this.bonuses.push(bonus)
  }
  remove(source: object) {
    this.bonuses = this.bonuses.filter(b => b.source !== source)
  }
}

export class AbilityBonus {
  value: number
  source: object | null

  constructor(value?: number, source?: object) {
    this.value = value ? value : 0
    this.source = source ? source : null
  }
}


export class Ability {
  name: AbilityName
  baseValue: number
  bonuses: AbilityBonus[]
  constructor(name: AbilityName, { baseValue = 10, bonuses = [] }: { baseValue?: number, bonuses?: AbilityBonus[] } = {}) {
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

export class Skill {
  constructor({
    name = '',
    bonuses = [],
    isProficient = false,
    derivedAbility = new Ability(),
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
    const profBonus = (this.isProficient) ? this.derivedProficiency.value : 0
    console.log(this.derivedAbility.finalValue)
    return this.derivedAbility.finalValue +
      this.bonuses.reduce((sum, e) => e + sum, 0) + profBonus
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
    }
  }
}

export class Save {
  constructor({
    name = '',
    bonuses = [],
    isProficient = false,
    derivedAbility = new Ability(),
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
      this.bonuses.reduce((sum, e) => e + sum, 0) + profBonus
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
  static generateDndCharacter() {
    let c = new DndCharacterModel()

    const abilityRolls = []
    for (let i = 0; i < 6; i++) {
      let rolls = []

      // gather 4 random d6 rolls
      for (let j = 0; j < 4; j++) {
        rolls.push(Math.floor(Math.random() * 5) + 1)
      }
      rolls.sort() // sort lowest -> highest
      rolls.splice(0, 1) // dropping lowest roll
      abilityRolls.push(rolls.reduce((e, sum) => e + sum, 0)) // push result 
    }

    // apply ability rolls to each character ability
    for (let ability in c.abilities) {
      c.abilities[ability].baseValue = abilityRolls.pop()
    }

    return c

  }

  constructor(oldState = getInitialState()) {
    this.abilities = {}
    this.skills = {}
    this.saves = {}
    this.proficiencyBonus = new ProficiencyBonus()
    this.deserialize(oldState)
  }

  serialize() {
    const wrapper = {}
    for (let ability in Object.values(this.abilities)) {
      wrapper.abilities[ability.name] = ability.serialize()
    }
    for (let skill in Object.values(this.skills)) {
      wrapper.skills[skill.name] = skill.serialize()
    }
    wrapper.proficiencyBonus = this.proficiencyBonus.value
    for (let save in Object.values(this.saves)) {
      wrapper.saves[save.name] = save.serialize()
    }
    wrapper.proficiencyBonus = this.proficiencyBonus.value
  }

  deserialize(serializedState) {

    if (typeof serializedState === "string") {
      JSON.parse(serializedState)
    }

    this.proficiencyBonus = new ProficiencyBonus({ value: serializedState.proficiencyBonus })

    /** Deserialize Abilities */
    Object.keys(serializedState.abilities).forEach(e => {
      const serializedAbility = serializedState.abilities[e]
      this.abilities[e] = new Ability({
        name: e,
        baseValue: serializedAbility.baseValue,
        bonuses: serializedAbility.bonuses
      })

      /** Deserialize Saves */
      Object.keys(serializedState.saves).forEach(e => {
        const serializedSave = serializedState.saves[e]
        this.saves[e] = new Save({
          name: e,
          bonuses: serializedSave.bonuses,
          isProficient: serializedSave.isProficient,
          derivedAbility: this.abilities[serializedSave.derivedAbility],
          derivedProficiency: this.proficiencyBonus
        })
      })

      /** Deserialize Skills */
      Object.keys(serializedState.skills).forEach(e => {
        const serializedSkill = serializedState.skills[e]
        this.skills[e] = new Skill({
          name: e,
          bonuses: serializedSkill.bonuses,
          isProficient: serializedSkill.isProficient,
          derivedAbility: this.abilities[serializedSkill.derivedAbility],
          derivedProficiency: this.proficiencyBonus
        })
      })
    })
  }
}
