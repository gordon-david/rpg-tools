import { AttributeBonus } from "./AttributeBonus";


export class Ability {
    key: string;
    displayName: string;
    baseValue: number;
    bonuses: AttributeBonus[];
    constructor(
        key: string,
        displayName: string,
        {
            baseValue = 10, bonuses = [],
        }: { baseValue?: number; bonuses?: AttributeBonus[]; } = {}
    ) {
        this.key = key;
        this.displayName = displayName;
        this.baseValue = baseValue;
        this.bonuses = bonuses;
    }

    get finalValue() {
        return this.baseValue + this.bonuses.reduce((sum, e) => sum + e.value, 0);
    }

    get modifier() {
        return Math.floor(this.finalValue / 2) - 5;
    }

    serialize() {
        return {
            key: this.key,
            displayName: this.displayName,
            baseValue: this.baseValue,
            bonuses: this.bonuses,
            finalValue: this.finalValue,
            modifier: this.modifier,
        };
    }
}
