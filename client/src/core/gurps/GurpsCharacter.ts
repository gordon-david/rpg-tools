export interface ITrait {
  value: number;
  points: number;
  pointsPerLevel: number;
  key: string;
  displayName: string;
  abbreviation: string;
  increment: () => void;
  decrement: () => void;
}

interface _Trait {
  key: string;
  displayName: string;
  abbreviation: string;
  description: string;
  pointCost: number;
}

interface ValuedTrait extends _Trait {
  value: number;
}

interface LeveledTrait extends ValuedTrait {
  increment: () => void;
  decrement: () => void;
}

interface DerivedTrait extends _Trait {
  derivedTraits: { [key: string]: _Trait };
}

interface Serializable<T> {
  toJson: () => T;
}

export class GurpsBasicAttribute implements ITrait {
  key: string;
  baseValue: number = 10;
  modifiers: number = 0;
  pointsPerLevel: number;
  displayName: string;
  abbreviation: string;
  constructor(
    key = "",
    { pointsPerLevel = 10, displayName = key, abbreviation = key } = {}
  ) {
    this.key = key;
    this.displayName = displayName;
    this.abbreviation = abbreviation;
    this.pointsPerLevel = pointsPerLevel;
  }

  get points() {
    return this.modifiers * this.pointsPerLevel;
  }

  get value() {
    return this.baseValue + this.modifiers;
  }

  increment() {
    this.modifiers += 1;
  }

  decrement() {
    if (!(this.modifiers - 1 + this.baseValue < 0)) {
      this.modifiers -= 1;
    }
  }
}

export enum SkillDifficulty {
  E = "Easy",
  A = "Average",
  H = "Hard",
  VH = "Very Hard",
}

export class GurpsSkill implements ITrait {
  key: string;
  modifiers: number = 0;
  displayName: string;
  abbreviation: string;
  derivedAttribute: ITrait;
  skillDifficulty: SkillDifficulty;
  constructor(
    key: string,
    derivedAttribute: ITrait,
    skillDifficulty: SkillDifficulty
  ) {
    this.key = key;
    this.displayName = key;
    this.abbreviation = key;
    this.derivedAttribute = derivedAttribute;
    this.skillDifficulty = skillDifficulty;
  }

  get pointsPerLevel() {
    if (this.modifiers === 0) {
      return 0;
    }

    if (this.modifiers === 1) {
      return 1;
    }

    if (this.modifiers === 2) {
      return 2;
    }
    return (this.modifiers - 2) * 4;
  }

  get points() {
    return this.pointsPerLevel;
  }

  get value() {
    const skillInitialMod = {
      [SkillDifficulty.E]: 0,
      [SkillDifficulty.A]: -1,
      [SkillDifficulty.H]: -2,
      [SkillDifficulty.VH]: -3,
    };

    return (
      this.derivedAttribute.value +
      this.modifiers +
      skillInitialMod[this.skillDifficulty]
    );
  }

  increment() {
    this.modifiers += 1;
  }

  decrement() {
    if (this.modifiers + this.derivedAttribute.value - 1 <= 0) {
      return;
    }

    if (this.points === 0) {
      return;
    }

    this.modifiers -= 1;
  }
}

export class DerivedCharacteristic implements ITrait {
  key: string;
  modifiers: number = 0;
  pointsPerLevel: number;
  displayName: string;
  abbreviation: string;
  derivedAttribute: GurpsBasicAttribute;

  constructor(
    key: string,
    derivedAttribute: GurpsBasicAttribute,
    { pointsPerLevel = 10, displayName = key, abbreviation = key } = {}
  ) {
    this.key = key;
    this.displayName = displayName;
    this.abbreviation = abbreviation;
    this.pointsPerLevel = pointsPerLevel;
    this.derivedAttribute = derivedAttribute;
  }

  get points() {
    return this.modifiers * this.pointsPerLevel;
  }

  get value() {
    return this.derivedAttribute.value + this.modifiers;
  }

  increment() {
    this.modifiers += 1;
  }

  decrement() {
    if (!(this.modifiers - 1 + this.derivedAttribute.value < 0)) {
      this.modifiers -= 1;
    }
  }
}

export class HitPoints extends DerivedCharacteristic {
  private modifier: number = 0;
  constructor(derivedStrength: GurpsBasicAttribute) {
    super("hitPoints", derivedStrength, { pointsPerLevel: 2 });
  }

  get baseValue() {
    return this.derivedAttribute.value;
  }

  get value() {
    return this.baseValue + this.modifier;
  }

  get points() {
    return this.modifier * this.pointsPerLevel;
  }

  increment() {
    this.modifier += 1;
  }

  decrement() {
    if (!(this.baseValue + this.modifier < 0)) {
      this.modifier -= 1;
    }
  }
}

class BasicSpeed extends DerivedCharacteristic {
  derivedHealth: GurpsBasicAttribute;
  derivedDexterity: GurpsBasicAttribute;
  constructor(
    derivedHealth: GurpsBasicAttribute,
    derivedDexterity: GurpsBasicAttribute
  ) {
    super("basicSpeed", derivedDexterity, {
      pointsPerLevel: 5,
      displayName: "Basic Speed",
      abbreviation: "BS",
    });
    this.derivedDexterity = derivedDexterity;
    this.derivedHealth = derivedHealth;
  }

  get value() {
    return (
      (this.derivedDexterity.value + this.derivedHealth.value) / 4 +
      this.modifiers / 4
    );
  }

  decrement() {
    if (!(this.value - 0.25 < 0)) {
      this.modifiers += 1;
    }
  }
}

class BasicMove implements ITrait {
  pointsPerLevel: number;
  key: string;
  displayName: string;
  abbreviation: string;
  derivedBasicSpeed: BasicSpeed;
  private modifiers: number = 0;

  constructor(derivedBasicSpeed: BasicSpeed) {
    this.derivedBasicSpeed = derivedBasicSpeed;
    this.key = "basicMove";
    this.displayName = "Basic Move";
    this.abbreviation = "BM";
    this.pointsPerLevel = 5;
  }

  get value() {
    return Math.floor(this.derivedBasicSpeed.value);
  }

  get points() {
    return this.modifiers * this.pointsPerLevel;
  }

  increment() {
    this.modifiers += 1;
  }
  decrement() {
    if (!(this.value + this.modifiers - 1 < 0)) {
      this.modifiers -= 1;
    }
  }
}

export class SimplePositiveTrait implements ITrait {
  value: number;
  points: number;
  pointsPerLevel: number;
  key: string;
  displayName: string;
  abbreviation: string;

  constructor(name: string, cost: number) {
    if (cost < 0) {
      throw new Error("Negative Cost On SimplePositiveTrait");
    }
    this.key = name;
    this.abbreviation = name;
    this.displayName = name;
    this.pointsPerLevel = 0;
    this.points = cost;
    this.value = 0;
  }

  increment: () => void = () => {};
  decrement: () => void = () => {};
}

/**
 * An unlevelled, static positive cost trait. Represents Advantages and Quirks in GURPS.
 */
export class SimpleNegativeTrait implements ITrait {
  value: number;
  points: number;
  pointsPerLevel: number;
  key: string;
  displayName: string;
  abbreviation: string;

  /**
   *
   * @param name
   * @param cost
   * @throws error
   */
  constructor(name: string, cost: number) {
    if (cost > 0) {
      throw new Error("Positive Cost On SimpleNegativeTrait");
    }
    this.key = name;
    this.abbreviation = name;
    this.displayName = name;
    this.pointsPerLevel = 0;
    this.points = cost;
    this.value = 0;
  }

  increment: () => void = () => {};
  decrement: () => void = () => {};
}

class Dodge implements ITrait {
  pointsPerLevel: number;
  key: string;
  displayName: string;
  abbreviation: string;
  derivedBasicSpeed: BasicSpeed;

  constructor(derivedBasicSpeed: BasicSpeed) {
    this.derivedBasicSpeed = derivedBasicSpeed;
    this.key = "dodge";
    this.displayName = "Dodge";
    this.abbreviation = "Dodge";
    this.pointsPerLevel = 0; // cannot increment or decrement dodge
  }

  get value() {
    return Math.floor(this.derivedBasicSpeed.value + 3);
  }

  get points() {
    return 0;
  }

  increment() {
    throw new Error("Dodge Can Not Be Modified");
  }
  decrement() {
    throw new Error("Dodge Can Not Be Modified");
  }
}

export class GurpsCharacterModel {
  basicTraits: {
    strength: GurpsBasicAttribute;
    dexterity: GurpsBasicAttribute;
    intelligence: GurpsBasicAttribute;
    health: GurpsBasicAttribute;
    [key: string]: ITrait;
  };
  skills: {
    [key: string]: GurpsSkill;
  } = {};
  extraPositiveTraits: { [key: string]: SimplePositiveTrait } = {};
  extraNegativeTraits: { [key: string]: SimpleNegativeTrait } = {};

  constructor() {
    let strength = new GurpsBasicAttribute("strength", {
      pointsPerLevel: 10,
      displayName: "Strength",
      abbreviation: "ST",
    });
    let dexterity = new GurpsBasicAttribute("dexterity", {
      pointsPerLevel: 20,
      displayName: "Dexterity",
      abbreviation: "DX",
    });
    let intelligence = new GurpsBasicAttribute("intelligence", {
      pointsPerLevel: 20,
      displayName: "Intelligence",
      abbreviation: "IQ",
    });
    let health = new GurpsBasicAttribute("health", {
      pointsPerLevel: 10,
      displayName: "Health",
      abbreviation: "HT",
    });

    this.basicTraits = {
      strength: strength,
      dexterity: dexterity,
      intelligence: intelligence,
      health: health,
    };

    this.basicTraits.hitPoints = new DerivedCharacteristic(
      "hitPoints",
      strength,
      { pointsPerLevel: 2, displayName: "Hit Points", abbreviation: "HP" }
    );
    this.basicTraits.will = new DerivedCharacteristic("will", intelligence, {
      pointsPerLevel: 5,
      displayName: "Will",
      abbreviation: "Will",
    });
    this.basicTraits.fatiguePoints = new DerivedCharacteristic(
      "fatiguePoints",
      health,
      { pointsPerLevel: 3, displayName: "Fatigue Points", abbreviation: "FP" }
    );
    this.basicTraits.perception = new DerivedCharacteristic(
      "perception",
      intelligence,
      { pointsPerLevel: 5, displayName: "Perception", abbreviation: "Per" }
    );
    this.basicTraits.basicSpeed = new BasicSpeed(health, dexterity);
    this.basicTraits.basicMove = new BasicMove(
      this.basicTraits["basicSpeed"] as BasicSpeed
    );
  }

  addSkill(skill: GurpsSkill) {
    // no dupes
    if (this.skills[skill.key] !== undefined) {
      throw new Error("Duplicate Skill Key/Name Added");
    }

    this.skills[skill.key] = skill;
  }

  removeSkill(key: string) {
    delete this.skills[key];
  }

  addPositiveExtra(trait: SimplePositiveTrait) {
    if (trait.key in this.extraPositiveTraits) {
      throw new Error("Duplicate Extra Trait Key");
    }
    this.extraPositiveTraits[trait.key] = trait;
  }

  removePositiveExtra(key: string) {
    delete this.extraPositiveTraits[key];
  }

  addNegativeExtra(trait: SimpleNegativeTrait) {
    if (trait.key in this.extraNegativeTraits) {
      throw new Error("Duplicate Extra Trait Key");
    }
    this.extraNegativeTraits[trait.key] = trait;
  }

  removeNegativeExtra(key: string) {
    delete this.extraNegativeTraits[key];
  }

  get totalPoints(): number {
    return (
      Object.keys(this.basicTraits).reduce(
        (p, c) =>
          ((p) => (typeof p === "number" ? p : this.basicTraits[p].points))(p) +
          this.basicTraits[c].points,
        0
      ) +
      Object.keys(this.skills).reduce(
        (p, c) =>
          ((p) => (typeof p === "number" ? p : this.skills[p].points))(p) +
          this.skills[c].points,
        0
      ) +
      Object.keys(this.extraPositiveTraits).reduce(
        (p, c) =>
          ((p) =>
            typeof p === "number" ? p : this.extraPositiveTraits[p].points)(p) +
          this.extraPositiveTraits[c].points,
        0
      )
    );
  }
}
