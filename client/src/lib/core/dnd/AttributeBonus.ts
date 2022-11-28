
export class AttributeBonus {
    value: number;
    source: object | null;

    constructor(value?: number, source?: object) {
        this.value = value ? value : 0;
        this.source = source ? source : null;
    }
}
