import React, { useState } from 'react'
import { Dice } from './Dice'

interface _IDice {
    diceType: string,
    displayname: string,
    amount: number
}

interface IDicePoolContainer {
    [prop:string]:_IDice
}

export interface IDicePoolProps {
    roll: any,
    dice: _IDice[]
}

const defaultProps : IDicePoolProps = {
    dice: [],
    roll(){}
}
function makeDicePool(diceArr: _IDice[]): IDicePoolContainer {
    let toReturn = {}
    diceArr.forEach( (dice:_IDice) => {
        toReturn[dice.diceType] = {
            ...dice,
            amount: 0
        }
    })
    return toReturn
}

/*
   Displays and manages a collection of dice to be rolled.

   Props:
   - dice: an array of Dice model objects used to populate
   the dice pool.
   - roll: a callback that accepts the current dice array.

   Requirements:
   - Displays collection of Dice objects
   - incrementing dice in the dice pool
   - clearing the dice pool
   - rolling the dice
   - clearing the dice when rolled
 */
export function DicePool(props:IDicePoolProps){
    const [dicePool, setDicePool]:[IDicePoolContainer, any] = useState(makeDicePool(props.dice))

    function clear() {
        setDicePool(makeDicePool(props.dice))
    }

    function increment(diceType: string){
        let toIncrement = dicePool[diceType]
        toIncrement.amount += 1
        setDicePool({...dicePool, [diceType]:toIncrement})
    }

    function roll(){

        props.roll()
        setDicePool(makeDicePool(props.dice))
    }

    return (
        <div className='dice-pool'>
            {
                Object.keys(dicePool).map(diceType =>
                    <Dice
                        displayName={dicePool[diceType].displayname}
                        diceType={diceType}
                        increment={() => increment(diceType)}
                        amount={dicePool[diceType].amount}
                        key={diceType}
                    />
                )
            }
            <button id='clear' onClick={clear}>clear</button>
            <button id='roll' onClick={roll}>roll</button>
        </div>
    );
}
DicePool.defaultProps = defaultProps
