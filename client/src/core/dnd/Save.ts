import { AttributeBonus } from "./AttributeBonus";
import { Ability } from "./Ability";
import { ProficiencyBonus } from "./ProficiencyBonus";


export class Save {
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
        { bonuses = [], isProficient = false } = {}
    ) {
        this.key = key;
        this.displayName = displayName;
        this.bonuses = bonuses;
        this.isProficient = isProficient;
        this.derivedAbility = derivedAbility;
        this.derivedProficiency = derivedProficiency;
    }

    // derived data
    get finalValue() {
        const profBonus = this.isProficient ? this.derivedProficiency.value : 0;
        return (
            this.derivedAbility.finalValue +
            this.bonuses.reduce((sum, e) => e.value + sum, 0) +
            profBonus
        );
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
            name: this.key,
            derivedAbility: this.derivedAbility.key,
        };
    }
}
