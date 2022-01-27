import React, { useState } from "react";
import "./SWDice.scss";
import { DiceFactory, addGenesysDice, DiceTypes, DiceFaces } from "../../utilities/Dice";
import { connect } from 'react-redux'
import { actionCreators } from '../../store'

const defaultDice = (() => {
  let toReturn = {} as IDicePool;
  Object.values(DiceTypes.Genesys).forEach((d: string) => {
    toReturn[d] = 0;
  });
  return toReturn;
})();

interface IDicePool { [key: string]: number }

interface Result {
  time: Date,
  value: Array<string>
}

function SWDice() {
  const [points, setPoints] = useState([]);
  const [dicePool, setDice] = useState({ ...defaultDice } as IDicePool);
  const [results, setResults] = useState([]);

  function incDice(key: string) {
    setDice({ ...dicePool, [key]: dicePool[key] + 1 });
  }

  function incSidePoints() {
    setPoints([...points, DiceFaces.Genesys.LIGHT]);
  }

  function decSidePoints() {
    setPoints(points.slice(0, points.length - 1));
  }

  function switchSide(idx: number) {
    let temp = [...points];
    temp[idx] = temp[idx] === DiceFaces.Genesys.LIGHT ? DiceFaces.Genesys.DARK : DiceFaces.Genesys.LIGHT;
    setPoints(temp);
  }

  function clearDice() {
    setDice(defaultDice);
  }

  function roll() {
    const values: Array<string> = addGenesysDice(Object.keys(dicePool)
      .flatMap(d => Array(dicePool[d]).fill(DiceFactory(d))).flatMap(d => d.roll()))

    const lastForceResults = values.filter((d: string) => d === DiceFaces.Genesys.DARK || d === DiceFaces.Genesys.LIGHT)

    if (lastForceResults.length > 0) {
      setPoints([...points, ...lastForceResults])
    }

    setResults([...results, { time: Date.now(), value: values }])
    setDice({ ...defaultDice })
  }

  return (
    <div className="swdice-container">
      <div className="side-points">
        <div className="side-points-buttons">
          <button className="inc-side-points" onClick={incSidePoints}>
            +
          </button>
          <button className="dec-side-points" onClick={decSidePoints}>
            -
          </button>
        </div>
        <div id="force-tokens-display">

          {points.map((p, idx) => (
            <div
              key={idx}
              onClick={() => switchSide(idx)}
              className={`${p} circle force-token`}
            />
          ))}

        </div>
      </div>
      <div className="dice-roller">
        <div className="dice-pool">
          {Object.keys(dicePool).map((d: string) => (
            <div className="dice" id={`${d}`} key={d}>
              <button
                onClick={() => incDice(d)}
                className="increase-dice-count"
                id={`${d}`} >
                {`${(() => {
                  switch (d) {
                    case DiceTypes.Genesys.ABILITY: return "Ability";
                    case DiceTypes.Genesys.BOOST: return "Boost";
                    case DiceTypes.Genesys.CHALLENGE: return "Challenge";
                    case DiceTypes.Genesys.DIFFICULTY: return "Difficulty";
                    case DiceTypes.Genesys.PROFICIENCY: return "Proficiency";
                    case DiceTypes.Genesys.SETBACK: return "Setback";
                    case DiceTypes.Genesys.FORCE: return "Force";
                    default: return "";
                  }
                })()}\n${dicePool[d]}`}
              </button>
            </div>
          ))}
        </div>
        <div className="dice-roller-buttons">
          <button id='clear-dice' onClick={clearDice}>clear</button>
          <button id='roll' onClick={roll}>roll</button>
        </div>
      </div>
      <ul className="results-list">
        {results
          .sort((a: Result, b: Result) => a.time.valueOf() as number - b.time.valueOf() as number)
          .map((r, idx) =>
            <li
              key={idx}
              className="result-item">
              {
                r.value.map(i => {
                  switch (i) {
                    case DiceFaces.Genesys.TRIUMPH: return "Triumph ";
                    case DiceFaces.Genesys.ADVANTAGE: return "Advantage ";
                    case DiceFaces.Genesys.SUCCESS: return "Success ";
                    case DiceFaces.Genesys.DISPAIR: return "Dispair ";
                    case DiceFaces.Genesys.FAILURE: return "Failure ";
                    case DiceFaces.Genesys.THREAT: return "Threat ";
                    case DiceFaces.Genesys.LIGHT: return "Light ";
                    case DiceFaces.Genesys.DARK: return "Dark ";
                    default: return "";
                  }
                })
              }
            </li>
          )
        }
      </ul>
    </div >
  );
}

export default connect(
    (state: any)=>({
        rollResults: state.rollResults
    }),
    (dispatch)=>({
        addRollResult: (result: any) => dispatch(actionCreators.addRollResult(result))
    })
)(SWDice);
