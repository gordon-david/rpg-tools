function getInitialState() {
  return {
    attributes: {
      agility: { displayName: "Agility" },
      strength: { displayName: "Strength" },
      spirit: { displayName: "Spirit" },
      smarts: { displayName: "Smarts" },
      vigor: { displayName: "Vigor" },
    },
    skills: {
      athletics: {
        displayName: "Athletics",
        core: true,
        derivedAttribute: "agility",
        points: 0,
      },
      boating: {
        displayName: "Boating",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      driving: {
        displayName: "Driving",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      fighting: {
        displayName: "Fighting",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      piloting: {
        displayName: "Piloting",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      riding: {
        displayName: "Riding",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      shooting: {
        displayName: "Shooting",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      stealth: {
        displayName: "Stealth",
        core: true,
        derivedAttribute: "agility",
        points: 0,
      },
      thievery: {
        displayName: "Thievery",
        core: false,
        derivedAttribute: "agility",
        points: 0,
      },
      common_knowledge: {
        displayName: "Common Knowledge",
        core: true,
        derivedAttribute: "smarts",
        points: 0,
      },
      academics: {
        displayName: "Academics",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      battle: {
        displayName: "Battle",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      gambling: {
        displayName: "Gambling",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      healing: {
        displayName: "Healing",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      language: {
        displayName: "Language",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      notice: {
        displayName: "Notice",
        core: true,
        derivedAttribute: "smarts",
        points: 0,
      },
      occult: {
        displayName: "Occult",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      research: {
        displayName: "Research",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      repair: {
        displayName: "Repair",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      science: {
        displayName: "Science",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      survival: {
        displayName: "Survival",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      taunt: {
        displayName: "Taunt",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      spellcasting: {
        displayName: "Spellcasting",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      psionics: {
        displayName: "Psionics",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      electronics: {
        displayName: "Electronics",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      hacking: {
        displayName: "Hacking",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      weird_science: {
        displayName: "Wierd Science",
        core: false,
        derivedAttribute: "smarts",
        points: 0,
      },
      persuasion: {
        displayName: "Persuasion",
        core: true,
        derivedAttribute: "spirit",
        points: 0,
      },
      faith: {
        displayName: "Faith",
        core: false,
        derivedAttribute: "spirit",
        points: 0,
      },
      intimidation: {
        displayName: "Intimidation",
        core: false,
        derivedAttribute: "spirit",
        points: 0,
      },
      performance: {
        displayName: "Performance",
        core: false,
        derivedAttribute: "spirit",
        points: 0,
      },
      focus: {
        displayName: "Focus",
        core: false,
        derivedAttribute: "spirit",
        points: 0,
      },
    },
  };
}

/*
 * Generic utility function that provides a rank ordering of
 * die codes starting from d4-2 and increasing beyond
 * d12.
 *
 * Example:
 *  points:   0    1  2  3  4   5   6     ...
 *  die step: d4-2 d4 d6 d8 d10 d12 d12+2 ...
 */
function pointValueDieCode(dieRank: number): string | undefined {
  if (dieRank < 0) {
    return undefined;
  }

  const dieCodeRanks: { [rank: number]: string } = {
    0: "d4-2",
    1: "d4",
    2: "d6",
    3: "d8",
    4: "d10",
    5: "d12",
  };

  if (dieRank <= 5) {
    return dieCodeRanks[dieRank];
  } else {
    return `d12+${(dieRank - 5) * 2}`;
  }
}

export class SwadeAttribute {
  _points: number;
  name: string;
  displayName: string;

  constructor({ name = "", displayName = "", points = 0 } = {}) {
    this.name = name;
    this._points = points;
    this.displayName = displayName;
  }

  get dieRank() {
    return pointValueDieCode(Math.floor(this.points / 2) + 1);
  }

  get points() {
    return this._points;
  }

  set points(value) {
    if (value >= 0) {
      this._points = value;
    }
  }

  incrementDieRank() {
    if (this.points % 2 === 0) {
      this.points += 2;
    } else {
      this.points += 1;
    }
  }

  decrementDieRank() {
    if (this.points % 2 === 0) {
      this.points -= 2;
    } else {
      this.points -= 1;
    }
  }

  serialize() {
    return {
      name: this.name,
      value: this.dieRank,
      points: this.points,
    };
  }
}

export class SwadeSkill {
  _points: number = 0;
  name: string;
  displayName: string;
  isCore: boolean = false;
  derivedAttribute: SwadeAttribute;

  constructor({
    name = "",
    displayName = "",
    isCore = false,
    points = 0,
    derivedAttribute = new SwadeAttribute(),
  } = {}) {
    this.name = name;
    this.displayName = displayName;
    this._points = points;
    this.isCore = isCore;
    this.derivedAttribute = derivedAttribute;

    if (isCore) {
      points = 1;
    }
  }

  set points(value) {
    if (value < 0) {
      this._points = 0;
      return;
    }

    this._points = value;
  }

  get points() {
    return this._points;
  }

  incrementValue() {
    const pointsDelta =
      this.points - (Math.floor(this.derivedAttribute.points / 2) + 1);
    if (pointsDelta < 0) {
      this.points += 1;
    } else if (pointsDelta % 2 === 0) {
      this.points += 2;
    } else {
      this.points += 1;
    }
  }

  decrementValue() {
    const pointsDelta =
      this.points - (Math.floor(this.derivedAttribute.points / 2) + 1);
    if (pointsDelta < 0) {
      // skill is below attribute
      // decrement by 1 to lower die rank by 1
      this.points -= 1;
    } else if (pointsDelta % 2 === 0) {
      // skill is above attribute
      // and is even, decrement by 2 to
      // lower die rank by 1
      this.points -= 2;
    } else {
      // skill must be above attribute and odd
      // decrement by 1 to lower die rank by 1
      this.points -= 1;
    }
  }

  // derived/calculated data
  get value() {
    const tempPoints = this.isCore ? this.points + 1 : this.points;
    const pointsDelta =
      tempPoints - (Math.floor(this.derivedAttribute.points / 2) + 1);
    let pointsAboveAttributeLevel = pointsDelta < 0 ? 0 : pointsDelta;
    let pointsBelowAttributeLevel = tempPoints - pointsAboveAttributeLevel;
    const effectivePoints =
      pointsBelowAttributeLevel + Math.floor(pointsAboveAttributeLevel / 2);
    return pointValueDieCode(effectivePoints);
  }

  serialize() {
    return {
      name: this.name,
      points: this.points,
      derivedAttribute: this.derivedAttribute.name,
      core: this.isCore,
    };
  }
}

export class SwadeCharacter {
  attributes: { [name: string]: SwadeAttribute };
  skills: { [name: string]: SwadeSkill };
  name: string = "";

  constructor(oldState: any = getInitialState()) {
    this.attributes = {};
    this.skills = {};
    // build attributes from old state data
    for (let attributeKey of Object.keys(oldState.attributes)) {
      this.attributes[attributeKey] = new SwadeAttribute({
        name: `${attributeKey}`,
        points: oldState.attributes[attributeKey].points,
				displayName: oldState.attributes[attributeKey].displayName
      });
    }

    // build skills from old state data
    for (let skillKey of Object.keys(oldState.skills)) {
      this.skills[skillKey] = new SwadeSkill({
				displayName: oldState.skills[skillKey].displayName,
        name: `${skillKey}`,
        points: oldState.skills[skillKey].points,
        isCore: oldState.skills[skillKey].core,
        derivedAttribute:
          this.attributes[oldState.skills[skillKey].derivedAttribute],
      });
    }
  }

  get totalPoints() {
    let points = 0;
    Object.values(this.attributes).forEach((att) => (points += att.points));
    Object.values(this.skills).forEach((skill) => (points += skill.points));
    return points;
  }

  get totalAttributePoints() {
    let points = 0;
    for (let att in this.attributes) {
      points += this.attributes[att].points;
    }
    return points;
  }

  get totalSkillPoints() {
    let points = 0;
    for (let skill in this.skills) {
      points += this.skills[skill].points;
    }
    return points;
  }
}
