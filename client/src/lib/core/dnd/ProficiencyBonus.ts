
export class ProficiencyBonus {
    _value: number;
    constructor({ value = 0 } = {}) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value: number) {
        if (value < 0) {
            return;
        }
        this._value = value;
    }
}
