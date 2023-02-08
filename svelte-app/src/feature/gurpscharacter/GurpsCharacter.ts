interface Trait {
    totalPoints: () => number // total points this trait is worth
}

/**
 * Basic Trait is a core trait of a Gurps character (i.e. STR, DEX, etc)
 * 
 * This trait can be incremented and decremented by a set point cost
 */
class BasicTrait implements Trait {

    private baseValue: number // the starting value
    private pointsPerLevel: number // point cost of incrementing or decrementing the value
    private currentLevel: number = 0 // starting level is 0, this is incremented or decremented
    key: string // unique key used by wrapping aggregate
    displayName: string // display name of the trait

    constructor(key: string, displayName: string, baseValue: number, pointsPerLevel: number) {
        this.baseValue = baseValue
        this.pointsPerLevel = pointsPerLevel
        this.key = key
        this.displayName = displayName
    }

    totalPoints(): number {
        return this.currentLevel * this.pointsPerLevel
    };

    value(): number {
        return this.baseValue + this.currentLevel
    }

    increment(value: number): void {
        this.currentLevel += 1

    }
    decrement(value: number): void {
        this.currentLevel -= 1
    }
}

const SkillDifficulty = {
    E: "Easy",
    A: "Average",
    H: "Hard",
    VH: "Very Hard"
}

class Skill implements Trait {
    private difficulty: string
    private currentLevel: number = 0
    private derivedTrait: BasicTrait
    key: string
    displayName: string

    constructor(key: string, displayName: string, derivedTrait: BasicTrait, difficulty: "E" | "A" | "H" | "VH") {
        this.key = key
        this.displayName = displayName
        this.derivedTrait = derivedTrait
        this.difficulty = difficulty
    }

    /**
     * total points this skill is worth at this level
     */
    totalPoints() {
        return 0
    };
    /**
     *  the resulting value of this skill at current level, relative to its derived basic trait's current level and skill difficulty
     */
    value() {

    }
}

export class GurpsCharacter {
    // basicTraits
    // skills
    // advantages
    // disadvantages
}