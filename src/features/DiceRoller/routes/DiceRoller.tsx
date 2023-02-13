import { useEffect, useState } from "react";
import { Dice } from "../components/Dice";
import { DicePool } from "../components/DicePool";
import { DiceKey, PolyhedralDicePoolFactory } from "../core/Dice";


export function DiceRoller() {
    const [dicePool, setDicePool] = useState(PolyhedralDicePoolFactory())
    const [results, setResults] = useState([])
    const [diceMap, setDiceMap] = useState({})

    useEffect(() => {
        setDiceMap(dicePool.getDiceMap)
    }, [dicePool])

    function addDice(key: DiceKey){
        // add to dicePool
        dicePool.add(key)
        setDicePool(dicePool)
    }

    function removeDice(key: DiceKey){
        dicePool.remove(key)
        setDicePool(dicePool)
    }

    return <>

        <div className="dice-roller">
            <DicePool />
            <div>Roll Results List</div>
        </div>
    </>
}

