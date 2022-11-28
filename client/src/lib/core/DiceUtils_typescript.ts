export type DiceResult = {
  source: string;
  result: number;
};

class Dice {
  num: number;
  name: string;
  constructor(num: number, name: string) {
    this.num = num;
    this.name = name;
  }
  roll(): DiceResult {
    return {
      result: Math.floor(Math.random() * this.num) + 1,
      source: this.name,
    };
  }
}

/* Polyhedral Dice Classes */
export class D20 extends Dice {
  constructor() {
    super(20, D20.name);
  }
}

export class D12 extends Dice {
  constructor() {
    super(10, D12.name);
  }
}

export class D10 extends Dice {
  constructor() {
    super(10, D10.name);
  }
}

export class D8 extends Dice {
  constructor() {
    super(8, D8.name);
  }
}

export class D6 extends Dice {
  constructor() {
    super(6, D6.name);
  }
}

export class D4 extends Dice {
  constructor() {
    super(4, D4.name);
  }
}

/**
 * DicePool contains a collection of dice for
 * rolling and collecting results.
 */
export class DicePool {
  diceArray: Dice[];
  constructor() {
    this.diceArray = [];
  }
  add(dice: Dice | string) {
    if (typeof dice === "string") {
      let temp: Dice;
      switch (dice) {
        case D20.name:
          temp = new D20();
          break;
        case D12.name:
          temp = new D12();
          break;
        case D10.name:
          temp = new D10();
          break;
        case D8.name:
          temp = new D8();
          break;
        case D6.name:
          temp = new D6();
          break;
        case D4.name:
          temp = new D4();
          break;
        default:
          return;
      }
      this.diceArray.push(temp);
      return;
    }
    this.diceArray.push(dice);
  }
  remove(diceType: string) {
    const idx = this.diceArray.findIndex((d) => d.name === diceType);
    this.diceArray.splice(idx, 1);
  }
  count(diceType: string): number {
    let count = 0;
    this.diceArray.forEach((d) => {
      if (d.name === diceType) {
        count++;
      }
    });
    return count;
  }
  roll() {
    return this.diceArray.map((d) => d.roll());
  }
  rollAndSum() {
    return this.roll().reduce((p, c, cidx) => p + c.result, 0);
  }
  diceInPool(): { [name: string]: number } {
    let toReturn = {
      [D20.name]: 0,
      [D12.name]: 0,
      [D10.name]: 0,
      [D8.name]: 0,
      [D6.name]: 0,
      [D4.name]: 0,
    };

    this.diceArray.forEach((d) => {
      toReturn[d.name] += 1;
    });

    return toReturn;
  }
}
