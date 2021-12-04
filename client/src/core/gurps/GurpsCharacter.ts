class GurpsAttribute {
  name: string
  baseValue: number
  pointsPerLevel: number
  currentLevel: number

  constructor(name = "", { pointsPerLevel = 10, baseValue = 10 } = {}) {
    this.name = name;
    this.baseValue = baseValue;
    this.pointsPerLevel = pointsPerLevel;
    this.currentLevel = baseValue;
  }

  get points() {
    return (this.currentLevel - this.baseValue) * this.pointsPerLevel;
  }
}

class GurpsCharacteristic {
  name: string;
  derivedAttribute: GurpsAttribute;
  pointsPerLevel: number;
  constructor(
    name = "",
    derivedAttribute = new GurpsAttribute(),
    { pointsPerLevel = 10 } = {}
  ) {
    this.name = name;
    this.derivedAttribute = derivedAttribute;
    this.pointsPerLevel = pointsPerLevel;
  }
}

class GurpsSkill {
  name: any;
  derivedAttribute: any;
  difficulty: string;
  constructor(name: string, derivedAttribute: GurpsAttribute, { difficulty = "A" } = {}) {
    this.name = name;
    this.derivedAttribute = derivedAttribute;
    this.difficulty = difficulty;
  }
}

class GurpsCharacterModel {
  primary: { strength: GurpsAttribute; dexterity: GurpsAttribute; intelligence: GurpsAttribute; health: GurpsAttribute; };
  characteristics: { hitPoints: {}; will: GurpsCharacteristic; perception: {}; fatiguePoints: {}; };
  skills: { lifting: GurpsSkill; };
  constructor() {
    this.primary = {
      strength: new GurpsAttribute("strength"),
      dexterity: new GurpsAttribute("dexterity", { pointsPerLevel: 20 }),
      intelligence: new GurpsAttribute("intelligence", { pointsPerLevel: 20 }),
      health: new GurpsAttribute("health"),
    };
    this.characteristics = {
      hitPoints: {},
      will: new GurpsCharacteristic("will", this.primary.intelligence, {
        pointsPerLevel: 5,
      }),
      perception: {},
      fatiguePoints: {},
    };

    this.skills = {
      lifting: new GurpsSkill("lifting", this.primary.strength),
    };
  }
}