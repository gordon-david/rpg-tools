import { RollResult } from "../../store"

abstract class Dice{
    dicefaces: string[][] | number[]
    classname: string
    constructor(dicefaces: string[][] | number[], classname: string){
        this.classname = classname
        this.dicefaces = dicefaces
    }

    roll():string[]|number{
        return this.dicefaces[Math.floor(Math.random() * Math.floor(this.dicefaces.length))]
    }
}

abstract class PolyhedralDice extends Dice{

    constructor(dicefaces:number[], classname:string){
        super(dicefaces, classname)
    }
    roll(){
        return this.dicefaces[Math.floor(Math.random() * Math.floor(this.dicefaces.length))]
    }
}


class PolyhedralD4 extends PolyhedralDice{
    constructor(){
        super([1, 2, 3, 4], 'polyhedral-d4')
    }
}

class PolyhedralD6 extends PolyhedralDice{
    constructor(){
        super([1, 2, 3, 4, 5, 6], 'polyhedral-d6')
    }
}

class D10 extends PolyhedralDice{
    constructor(){
        super([1,2,3,4,,6,7,8,9,10], 'polyhedral-d10')
    }
}

interface GenesysRollResult{}

interface PolyhedralRollResult {}

interface _dice{
    diceType: string
    diceFaces: DiceFace[]
    roll: () => any
}

abstract class _GenesysDice implements _dice {
    diceType:string
    diceFaces:DiceFace[]
    constructor(diceType:string, diceFaces: DiceFace[]){
        this.diceType = diceType
        this.diceFaces = diceFaces
    }
    roll():GenesysRollResult{
        return {}
    }
}

function GenesysDiceRoller(diceFaces: DiceFace[]):GenesysRollResult{
    return {}
}

interface DiceFace{
    classname: string,
    displayname: string
}
class GenesysFaceBlank implements DiceFace{
    classname = 'genesys-face-blank'
    displayname = 'Blank'
}

class GenesysAdvantage extends _GenesysDice{
    constructor(){
        super('genesys-dice-advantage', [new GenesysFaceBlank()])
    }

    roll = () => GenesysDiceRoller(this.diceFaces)
}

/* Dice Pools */
interface DicePool{
    roll():RollResult
    addByClassname(classname:string):void
}

export {Dice}
