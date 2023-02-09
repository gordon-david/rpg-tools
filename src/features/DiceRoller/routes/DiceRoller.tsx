import { useState } from "react";
import { Dice } from "../components/Dice";
import { DicePool } from "../components/DicePool";
import { DiceTypes } from "../core/Dice";

interface IDicePool { [key: string]: number}

const defaultDice = (() => {
    let toReturn = {} as IDicePool;
    Object.values(DiceTypes.Polyhedral).forEach((dice: string) => toReturn[dice] = 0)
    return toReturn
})

export function DiceRoller(){
    const [dicePool, setDicePool] = useState({ ...defaultDice } as IDicePool)
    const [results, setResults] = useState([])
    
    return <>
    <Dice amount={5} diceType={"thing"} displayName={"another"} increment={() => console.log("increment")}/>
    
    <div className="dice-roller">
        <DicePool />
        <div>Roll Results List</div>
    </div>
    </>
}