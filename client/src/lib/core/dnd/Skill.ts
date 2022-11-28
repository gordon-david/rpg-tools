import { AttributeBonus } from "./AttributeBonus";
import { Ability } from "./Ability";
import { ProficiencyBonus } from "./ProficiencyBonus";

// export const SkillName = {
//   none: "none",
//   acrobatics: "acrobatics",
//   animal_handling: "animal_handling",
//   arcana: "arcana",
//   athletics: "athletics",
//   deception: "deception",
//   history: "history",
//   insight: "insight",
//   intimidation: "intimidation",
//   investigation: "investigation",
//   medicine: "medicine",
//   nature: "nature",
//   perception: 'perception',
//   performance: "performance",
//   persuasion: "persuasion",
//   religion: "religion",
//   sleight_of_hand: "sleight_of_hand",
//   stealth: "stealth",
//   survival: "survival"
// }

export class Skill {
    key: string;
    displayName: string;
    bonuses: AttributeBonus[];
    isProficient: boolean;
    derivedAbility: Ability;
    derivedProficiency: ProficiencyBonus;

    constructor(
        key: string,
        displayName: string,
        derivedAbility: Ability,
        derivedProficiency: ProficiencyBonus,
        {
            bonuses = [], isProficient = false,
        }: {
            bonuses?: any[];
            isProficient?: boolean;
        } = {}
    ) {
        this.key = key;
        this.displayName = displayName;
        this.bonuses = bonuses;
        this.isProficient = isProficient;
        this.derivedAbility = derivedAbility;
        this.derivedProficiency = derivedProficiency;
    }

    // calculated properties
    get modifier() {
        const profBonus = this.isProficient ? this.derivedProficiency.value : 0;
				return this.derivedAbility.modifier + this.bonuses.reduce((sum, e) => e.value + sum, 0) + profBonus


    }
    serialize() {
        return {
            bonuses: this.bonuses,
            isProficient: this.isProficient,
            modifier: this.modifier,
            key: this.key,
            displayName: this.displayName,
            derivedAbility: this.derivedAbility.key,
        };
    }
}
