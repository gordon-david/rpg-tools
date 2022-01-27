import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { DiceFaces } from '../../utilities/Dice'
import { RollResult, StoreState } from '../../store'

interface ForceTokensProps {
    rollResults: Array<RollResult>
}

/*
 * Force Tokens displays a combination of a filtered view
 * of the rolled SWDice results, and any user added force
 * tokens.
 *
 * Requirements:
 * - add force tokens manually with an increment button.
 * - add force tokens automatically from the dice roll results.
 * - remove force tokens manually with a decrement button.
 * - change color of a force token with a click on the token.
 */
function ForceTokens({ rollResults = [] }: ForceTokensProps) {

    const [forceTokens, setForceTokens] = useState([] as string[])
    const visitedRollResults = new Set()

    function incrementTokens(){
        setForceTokens(tokens => [...tokens, DiceFaces.Genesys.LIGHT])
    }

    function decrementTokens(){
        setForceTokens( (tokens: string[]) => tokens.slice(0, tokens.length-1))
    }

    function switchSides(idx){
        const temp = [...forceTokens]
        temp[idx] = (temp[idx] === DiceFaces.Genesys.LIGHT ? DiceFaces.Genesys.DARK : DiceFaces.Genesys.DARK)
        setForceTokens([...temp])
    }
   
    // runs on initial render only
    useEffect(() => {
        let filtered = []

        rollResults.forEach((result: RollResult) => {
            visitedRollResults.add(result.id)
            filtered.push(result.results.filter(face => face === DiceFaces.Genesys.LIGHT || face === DiceFaces.Genesys.DARK))
        })

        setForceTokens([...forceTokens, ...filtered])
    }, [])

    useEffect(() => {
        // filter only new roll results.
        // roll results should garauntee that new results
        // are at index 0, prepended to array
        if (rollResults[0] && !visitedRollResults.has(rollResults[0].id)) {
            visitedRollResults.add(rollResults[0].id)
            setForceTokens([
                ...forceTokens,
                ...rollResults[0].results.filter(face => face === DiceFaces.Genesys.LIGHT || face === DiceFaces.Genesys.DARK)
            ])
        }
    }, [rollResults])

    return (
        <div id='force-tokens'>
            <div>
                <button id='increment' onClick={incrementTokens}>+</button>
                <button id='decrement' onClick={decrementTokens}>-</button>
            </div>
            <div id='token-display'>
                {
                    forceTokens.map((token, idx) => <div key={idx} className={token} onClick={() => switchSides(idx)}>{token}</div>)
                }
            </div>
        </div>
    );
}

const ConnectedForceTokens = connect((state: StoreState) => ({rollResults: state.rollResults}))(ForceTokens)

export {ConnectedForceTokens as ForceTokens}
