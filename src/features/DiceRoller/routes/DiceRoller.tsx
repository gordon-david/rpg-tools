import { useEffect, useState } from "react";
import { Dice } from "../components/Dice";
import { DiceKey, DicePool, PolyhedralDicePoolFactory } from "../core/Dice";
import '../DiceRoller.css'

export function DiceRoller() {
  const [dicePoolWrapper, setDicePoolWrapper] = useState<{
    dicePool: DicePool;
  }>({
    dicePool: PolyhedralDicePoolFactory(),
  });
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    console.log("updating");
  });

  function update() {
    setDicePoolWrapper((dicePoolWrapper) => ({ ...dicePoolWrapper }));
  }

  function addDice(key: DiceKey) {
    dicePoolWrapper.dicePool.add(key);
    update();
  }

  function removeDice(key: DiceKey) {
    dicePoolWrapper.dicePool.remove(key);
    update();
  }

  function clear() {
    dicePoolWrapper.dicePool.clear();
    update();
  }

  function roll() {
    let result = dicePoolWrapper.dicePool.roll();

    setResults((results) => [result, ...results]);
    update();
  }

  return (
    <>
      <div className="dice-roller">
        <div className="dice-roller__dice-grid">
          {dicePoolWrapper.dicePool.getDice().map((dice) => (
            <Dice
              key={dice.key}
              increment={() => addDice(dice.key)}
              amount={dicePoolWrapper.dicePool.count(dice.key)}
              diceType={dice.key}
              displayName={dice.displayName}
            />
          ))}
        </div>
        <div className="dice-roller__controls">
          <button id="dice-roller__clear" onClick={clear}>
            Clear
          </button>
          <button id="dice-roller__roll" onClick={roll}>
            Roll
          </button>
        </div>
        <ul id="dice-roller__results">
          {results.map((result, index) => (
            <li key={`${result}-${index}`} id="result">
              {result}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
