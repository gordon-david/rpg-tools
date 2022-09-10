import exp from "constants";
import {
  DerivedCharacteristic,
  GurpsBasicAttribute,
  GurpsCharacterModel,
  GurpsSkill,
  SkillDifficulty,
} from "../core/gurps/GurpsCharacter";

describe("Gurps Character Model", function () {
  describe("Basic Attributes", () => {
    test("attribute defaults to 10 value", () => {
      const a = new GurpsBasicAttribute();
      expect(a.value).toEqual(10);
    });

    test("attributes increment and decrement value while altering point value by the set pointsPerLevel", () => {
      const a = new GurpsBasicAttribute("DX", { pointsPerLevel: 20 });

      expect(a.value).toEqual(10);
      expect(a.points).toEqual(0);

      a.increment();

      expect(a.value).toEqual(11);
      expect(a.points).toEqual(20);

      a.decrement();
      a.decrement();

      expect(a.value).toEqual(9);
      expect(a.points).toEqual(-20);
    });
  });
  describe("Secondary Characteristics", () => {
    test("altering derived attribute alters this characteristic", () => {
      const a = new GurpsBasicAttribute();
      const c = new DerivedCharacteristic("", a, {
        abbreviation: "DX",
        displayName: "Dexterity",
        pointsPerLevel: 20,
      });

      expect(c.value).toBe(10);
      a.increment();
      expect(c.value).toBe(11);
    });
  });

  describe("Skills", () => {
    test("altering derived attribute alters this characteristic", () => {
      const a = new GurpsBasicAttribute();
      const s = new GurpsSkill("", a, SkillDifficulty.A);

      expect(s.value).toBe(10);
      a.increment();
      expect(s.value).toBe(11);
    });
  });

  describe("Character", () => {
    test("characteristics tied to attributes on initialization", () => {
      const c = new GurpsCharacterModel();

      expect(
        (c.basicTraits["hitPoints"] as DerivedCharacteristic).derivedAttribute
          .key
      ).toBe(c.basicTraits.strength.key);

      c.basicTraits.strength.increment();

      expect(c.basicTraits.hitPoints.value).toEqual(11);
    });

    test("adding duplicate skill key throws and error", () => {
      const c = new GurpsCharacterModel();
      const s = new GurpsSkill("", c.basicTraits.strength, SkillDifficulty.A);

      c.addSkill(s);
      expect(() => c.addSkill(s)).toThrow();
    });
  });
});
