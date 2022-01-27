import { useContext } from "react";
import { SteppedValue } from "../common/StepValueNumericInput";
import { DNDCharacterProvider, useCharacter } from "./DndCharacterContext";

function DndCharacter() {
  return (
    <DNDCharacterProvider>
      <DndCharacterContainer />
    </DNDCharacterProvider>
  );
}

function DndCharacterContainer() {
  const {
    character,
    incrementProficiency,
    decrementProficiency,
    incrementBaseValue,
    decrementBaseValue,
    saveProficiencyToggle,
    skillProficiencyToggle,
    clear
  } = useCharacter();

  return (
    <section className="dnd-character">
      <h1>D&D Character Creator</h1>
      <button onClick={clear}>clear</button>
      <div className="section  dnd-proficiency-bonus">
        <h4>Proficiency Bonus:</h4>
        <SteppedValue displayText={`${character.proficiencyBonus.value}`}
          increment={incrementProficiency}
          decrement={decrementProficiency}
        />
      </div>
      <div className="section">
        <h4 className="section__header">Abilities </h4>
        <ul className="dnd-abilities">
          {Object.values(character.abilities).map((a) => (
            <li className="dnd-abilities__item" key={`character-ability-${a.key}`}>
              <span>
                {a.displayName}
              </span>
              <SteppedValue displayText={`${a.finalValue} (${a.modifier >= 0 ? "+" : ""}${a.modifier})`}
                increment={() => incrementBaseValue(a.key)}
                decrement={() => decrementBaseValue(a.key)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h4 className="section__header">Saves</h4>
        <ul>
          {Object.values(character.saves).map((s) => (
            <li key={`character-save-${s.key}`}>
              <input
                type="checkbox"
                checked={s.isProficient}
                onChange={(event) => saveProficiencyToggle(s.key)}
              />
              <span onClick={() => saveProficiencyToggle(s.key)}>
                {s.displayName} {s.finalValue}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h4 className="section__header">Skills</h4>
        <ul>
          {Object.values(character.skills).map((s) => (
            <li key={`character-skill-${s.key}`}>
              <input
                type="checkbox"
                checked={s.isProficient}
                onChange={() => skillProficiencyToggle(s.key)}
              />
              <span onClick={() => skillProficiencyToggle(s.key)}>
                {s.displayName} {s.modifier}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DndCharacter;