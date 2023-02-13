enum DiceKey {
    D4 = 'polyhedral-d4',
    D6 = 'polyhedral-d6',
    D8 = 'polyhedral-d8',
    D10 = 'polyhedral-d10',
    D12 = 'polyhedral-d12',
    D20 = 'polyhedral-d20',
    D100 = 'polyhedral-d100'
}

class PolyehedralDice {
    max: number
    key: DiceKey
    displayName: string

    constructor(displayName: string, key: DiceKey, max: number) {
        this.displayName = displayName
        this.key = key,
            this.max = max
    }

    roll(): number {
        return Math.floor(Math.random() * this.max) + 1
    }
}

class DiceFactory {
    static build(key: DiceKey): PolyehedralDice {
        switch (key) {
            case DiceKey.D4: return new PolyehedralDice('D4', key, 4)
            case DiceKey.D6: return new PolyehedralDice('D6', key, 6)
            case DiceKey.D8: return new PolyehedralDice('D8', key, 8)
            case DiceKey.D10: return new PolyehedralDice('D10', key, 10)
            case DiceKey.D12: return new PolyehedralDice('D12', key, 12)
            case DiceKey.D20: return new PolyehedralDice('D20', key, 20)
            case DiceKey.D100: return new PolyehedralDice('D100', key, 100)
            default: throw new Error("Dice type unsupported.")
        }
    }
}

class DicePool {
    private diceMap: { [DiceKey: string]: number }
    private diceCache: { [DiceKey: string]: PolyehedralDice }

    constructor(dicekeys: DiceKey[]) {
        this.diceMap = {}
        this.diceCache = {}
        console.log('new');
        

        dicekeys.forEach(key => {
            this.diceMap[key] = 0
            this.diceCache[key] = DiceFactory.build(key)
        })
    }

    add(diceKey: DiceKey) { this.diceMap[diceKey] += 1 }
    remove(diceKey: DiceKey) {
        if (this.diceMap[diceKey] < 1) return
        this.diceMap[diceKey] -= 1
    }

    getDiceKeys() { return Object.keys(this.diceMap) }
    getDiceMap() { return this.diceMap }

    roll(): number {
        let result = 0

        Object.keys(this.diceMap).forEach(key => {
            for (let rolls = 0; rolls < this.diceMap[key]; rolls++) {
                result += this.diceCache[key].roll()
            }
        })

        return result
    }

}

function PolyhedralDicePoolFactory(): DicePool {

    return new DicePool([
        DiceKey.D4,
        DiceKey.D6,
        DiceKey.D8,
        DiceKey.D10,
        DiceKey.D12,
        DiceKey.D20,
        DiceKey.D100,
    ])

}

export { PolyhedralDicePoolFactory, DicePool, DiceKey }