export class Ability {
  baseValue: number
  bonuses: AbilityBonus[]
  name: AbilityName | null
  constructor({ name = null, baseValue = 10, bonuses = [] }
    : { name?: AbilityName | null, baseValue?: number, bonuses?: AbilityBonus[] }
    = {}) {
    this.baseValue = baseValue
    this.bonuses = bonuses
    this.name = name
  }
  get finalScore() {
    return this.baseValue + this.bonuses.reduce((p: number, c: AbilityBonus) => p + c.value, 0)
  }
  serialize(): any {
    return {
      name: this.name,
      bonuses: [...this.bonuses],
      baseValue: this.baseValue
    }
  }
}

export class AbilityBonus {
  value: number
  abilityName: AbilityName | null
  source: Object
  constructor({ value = 0, abilityName = null }: { value?: number, abilityName?: AbilityName | null } = {}) {
    this.abilityName = abilityName
    this.value = value
    this.source = {}
  }
}

export class Species {
  name: string
  _abilityBonuses: AbilityBonus[] = []
  languages: Language[]

  constructor({ name = "", abilityBonuses = [], languages = [] }
    : { name?: string, abilityBonuses?: AbilityBonus[], languages?: Language[] }
    = {}) {

    this.name = name
    this.abilityBonuses = abilityBonuses
    this.languages = languages
  }

  set abilityBonuses(abilityBonuses: AbilityBonus[]) {
    this._abilityBonuses = abilityBonuses.map(b => {
      b.source = this // over writes source of bonuses
      return b
    })
  }
  get abilityBonuses() {
    return this._abilityBonuses
  }
}

export enum Language {
  galacticBasic = "Galactic Basic"
}

export enum AbilityName {
  strength = "strength",
  dexterity = "dexterity",
  constitution = "constitution",
  intelligence = "intelligence",
  wisdom = "wisdom",
  charisma = "charisma",
}

export const DefaultSpeciesContainer = {
  human: new Species({
    name: "Human",
    abilityBonuses: [],
    languages: [Language.galacticBasic]
  }),
}

export class Character {
  abilities: { [abilityName: string]: Ability }
  _species: Species | null = null
  languagesKnown: Language[]

  constructor({species = null}:{species?: Species | null} = {} ) {
    this.abilities = {
      strength: new Ability({ name: AbilityName.strength }),
      dexterity: new Ability({ name: AbilityName.dexterity }),
      constitution: new Ability({ name: AbilityName.constitution }),
      intelligence: new Ability({ name: AbilityName.intelligence }),
      wisdom: new Ability({ name: AbilityName.wisdom }),
      charisma: new Ability({ name: AbilityName.charisma }),
    }
    this.species = species
    this.languagesKnown = []
  }

  set species(species: Species | null) {
    this._removeAbilityBonusesFromSource(this._species)

    if (species === null || !(species instanceof Species)) {
          this._species = null
      return
    }

    this._addAbilityBonusesFromSource(species)
    this._species = species
  }

  _addAbilityBonusesFromSource(source: Species) {
    for (const abilityName in this.abilities) {
      this.abilities[abilityName].bonuses
        = [...this.abilities[abilityName].bonuses, ...source.abilityBonuses.filter(b => b.abilityName === abilityName)]
    }
  }

  _removeAbilityBonusesFromSource(source: Species | null) {
    if (!source) {
      return
    }

    Object.values(this.abilities).forEach(a => {
      a.bonuses = a.bonuses.filter(b => b.source !== source)
    })
  }
}