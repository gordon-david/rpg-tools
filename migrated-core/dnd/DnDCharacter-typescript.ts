import getInitialState from "./InitialState"
// import Skill from "./Skill"
// import Save from "./Save"
// import Ability from "./Ability"
// import ProficiencyBonus from "./ProficiencyBonus"

// export function DNDCharacter(oldState = getInitialState()) {
//   // validate args

//   // wrap incoming data
//   const wrapper = {};

//   // wrap abilities
//   wrapper.abilities = {};
//   Object.keys(oldState.abilities).forEach(e => {
//     const oldAbility = oldState.abilities[e]
//     wrapper.abilities[e] = Ability({
//       name: e,
//       baseValue: oldAbility.baseValue,
//       bonuses: oldAbility.bonuses
//     });
//   });

//   // wrap proficiency bonus
//   wrapper.proficiencyBonus = ProficiencyBonus({ value: oldState.proficiencyBonus });

//   // wrap skills
//   wrapper.skills = {};
//   Object.keys(oldState.skills).forEach(e => {
//     const oldSkill = oldState.skills[e];
//     wrapper.skills[e] = Skill({
//       name: e,
//       bonuses: oldSkill.bonuses,
//       isProficient: oldSkill.isProficient,

//       // These depend on previously set wrapper attributes
//       derivedProficiency: wrapper.proficiencyBonus,
//       derivedAbility: wrapper.abilities[oldSkill.derivedAbility]
//     });
//   });

//   // wrap saves
//   wrapper.saves = {}
//   // console.log(oldState.saves)
//   Object.keys(oldState.saves).forEach(e => {
//     const oldSave = oldState.saves[e]
//     wrapper.saves[e] = Save({
//       name: e,
//       bonuses: oldSave.bonuses,
//       isProficient: oldSave.isProficient,

//       // these depend on previously set wrapper attributes
//       derivedProficiency: wrapper.proficiencyBonus,
//       derivedAbility: wrapper.abilities[e] // saves and abilities share the same name
//     })
//   })

//   // serialization function
//   wrapper.serialize = function() {
//     const returnData = {};
//     returnData.proficiencyBonus = this.proficiencyBonus.FinalValue;
//     returnData.abilities = {};
//     Object.keys(this.abilities).forEach(abilityName => {
//       returnData.abilities[abilityName] = this.abilities[
//         abilityName
//       ].serialize();
//     });
//     returnData.skills = {};
//     Object.keys(this.skills).forEach(skillName => {
//       returnData.skills[skillName] = this.skills[skillName].serialize();
//     });
//     returnData.saves = {}
//     Object.keys(this.saves).forEach(saveName => {
//       returnData.saves[saveName] = this.saves[saveName].serialize()
//     })
//     return returnData;
//   }

//   // return mutated data
//   return wrapper
// }


export class Ability {

  constructor({ name = "", baseValue = 10, bonuses = [] } = {}) {
    this.name = name
    this._baseValue = baseValue
    this._bonuses = bonuses
  }

  get baseValue() {
    return this._baseValue;
  }
  set baseValue(value) {
    this._baseValue = value;
  }
  /** Calculated, Read-Only Member */
  get finalValue() {
    return this._baseValue + this._bonuses.reduce((sum, e) => sum + e, 0);
  }
  /** Calculated, Read-Only Member */
  get modifier() {
    return Math.floor(this.finalValue / 2) - 5;
  }
  get bonuses() {
    return this._bonuses
  }
  set bonuses(value) {
    if (!Array.isArray(value)) {
      console.log("new bonuses value is not an array")
    }
    this._bonuses = value
  }
  serialize() {
    return {
      name: this.name,
      baseValue: this.baseValue,
      bonuses: this.bonuses,
      finalValue: this.finalValue,
      modifier: this.Modifier,
    }
  }
}

export class ProficiencyBonus {
  constructor({ value = 0 } = {}) {
    this._value = value
  }
  get value() {
    return value;
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
    return this.derivedAbility.finalValue +
      this.bonuses.reduce((sum, e) => e + sum, 0) + profBonus
  }
  get modifier() {
    return Math.floor(this.FinalValue / 2) - 5;
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
};

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
    const profBonus = (this.IsProficient) ? derivedProficiency.FinalValue : 0
    return this.derivedAbility.FinalValue +
      this.Bonuses.reduce((sum, e) => e + sum, 0) + profBonus
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
  constructor(oldState = getInitialState()) {
    this.abilities = {}
    this.skills = {}
    this.saves = {}
    this.proficiencyBonus = 0
    this.deserialize(oldState)
  }
  deserialize(serializedState) {
    this.proficiencyBonus = new ProficiencyBonus(serializedState.proficiencyBonus)

    Object.keys(serializedState.abilities).forEach(e => {
      const serializedAbility = serializedState.abilities[e]
      this.abilities[e] = new Ability({ //TODO: this will break when this becomes a class
        name: e,
        baseValue: serializedAbility.baseValue,
        bonuses: serializedAbility.bonuses
      })

      Object.keys(serializedState.saves).forEach(e => {
        const serializedSave = serializedState.saves[e]
        this.saves[e] = new Save({
          name : e,
          bonuses : serializedSave.bonuses,
          isProficient : serializedSave.isProficient,
          derivedAbility : serializedSave.derivedAbility,
          derivedProficiency : this.proficiencyBonus
        })
      })

      Object.keys(serializedState.skills).forEach(e => {
        const serializedSkill = serializedState.skills[e]
        this.skills[e] = new Skill({
          name : e,
          bonuses : serializedSkill.bonuses,
          isProficient : serializedSkill.isProficient,
          derivedAbility : serializedSkill.derivedAbility,
          derivedProficiency : this.proficiencyBonus
        })
      })
    })
  }
}
