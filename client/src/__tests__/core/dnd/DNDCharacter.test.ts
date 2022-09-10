import {
  DNDCharacter,
  Ability,
  ProficiencyBonus,
  Skill,
  Save,
  AbilityName,
  SkillName,
} from "./DNDCharacter";
import { describe, test, expect } from "@jest/globals";

describe("skill wrapper function", () => {
  /**
   * args = {abilityName: '', baseValue}
   * dispatch({ type: 'updateCharacter', id: args.id, newState: CharacterWrapper(oldState, {args} )})
   */
  test("wrapper functions work with no input by setting default values", () => {
    const _character = new DNDCharacter();
  });
});

describe("Mutating ability should cascade mutations", () => {
  test("Update ability base value updates skill values", () => {
    const character = new DNDCharacter();
    // character.skills.athletics.derivedAbility = character.abilities.strength
    console.log(character.skills.athletics);
    console.log(character.skills["athletics"]);
    character.abilities.strength.baseValue = 10;
    expect(character.skills.athletics.finalValue).toEqual(10);
    character.abilities.strength.baseValue = 15;
    expect(character.skills[SkillName.athletics].finalValue).toEqual(15);
  });
});

describe("DNDCharacter", function () {
  test("Initializes", function () {
    const character = new DNDCharacter();
    expect(character).not.toBe(undefined);
    expect(character.abilities).not.toBe(undefined);
    expect(character.abilities.strength).not.toBe(undefined);
    expect(character.abilities["strength"]).not.toBe(undefined);
  });
});

describe("Ability", () => {
  test("Initializes", () => {
    const ability = new Ability(AbilityName.charisma);
    expect(ability).not.toBe(undefined);
  });
  test("access important fields", () => {
    const ability = new Ability(AbilityName.charisma);
    expect(ability.name).not.toBe(undefined);
    expect(ability.bonuses).not.toBe(undefined);
    expect(ability.baseValue).not.toBe(undefined);
    expect(ability.finalValue).not.toBe(undefined);
    expect(ability.modifier).not.toBe(undefined);
    expect(ability.serialize()).not.toBe(undefined);
  });
});

describe("Skill", () => {
  test("initializes", () => {
    const skill = new Skill(SkillName.acrobatics);
    expect(skill).not.toBe(undefined);
  });
  test("access important fields", () => {
    const skill = new Skill(SkillName.acrobatics, {
      derivedAbility: new Ability(AbilityName.dexterity),
      derivedProficiency: new ProficiencyBonus(),
    });
    expect(skill.name).not.toBe(undefined);
    expect(skill.finalValue).not.toBe(undefined);
    expect(skill.modifier).not.toBe(undefined);
    expect(skill.isProficient).not.toBe(undefined);
    expect(skill.derivedAbility).not.toBe(undefined);
    expect(skill.bonuses).not.toBe(undefined);
    expect(skill.serialize()).not.toBe(undefined);
  });
});
