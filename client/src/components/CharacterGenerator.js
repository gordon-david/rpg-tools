import { DNDCharacter } from '../core/dnd/DNDCharacter';
import { useState } from 'react';

const _character = new DNDCharacter()

function CharacterGenerator() {
  const [characterData, setCharacterData] = useState(_character.serialize())

  const incrementBaseValue = (abilityName) => {
    _character.abilities[abilityName].baseValue += 1
    setCharacterData(_character.serialize())
  }

  const decrementBaseValue = (abilityName) => {
    _character.abilities[abilityName].baseValue -= 1
    setCharacterData(_character.serialize())
  }

  const saveProficiencyChanged = (saveName) => {
    _character.saves[saveName].isProficient = !_character.saves[saveName].isProficient
    setCharacterData(_character.serialize())
  }

  const incrementProficiency = () => {
    _character.proficiencyBonus.value += 1
    setCharacterData(_character.serialize())
  }

  const decrementProficiency = () => {
    _character.proficiencyBonus.value -= 1
    setCharacterData(_character.serialize())
  }

  const skillProfiencyChanged = (skillName) => {
    _character.skills[skillName].isProficient = !_character.skills[skillName].isProficient
    setCharacterData(_character.serialize())
  }

  return (
      <section>
        <section>
          <span>Proficiency Bonus: {characterData.proficiencyBonus}</span>
          <button onClick={incrementProficiency}>+</button>
          <button onClick={decrementProficiency}>-</button>

        </section>
        <section>
          <h4>Abilities </h4>
          <ul>
            {
              Object.values(characterData.abilities).map(a =>
                <li key={`character-ability-${a.name}`}>
                  <span>
                    {a.name} {a.finalValue} {(a.modifier >= 0) ? "+" : ""}{a.modifier}
                  </span>
                  <button onClick={() => incrementBaseValue(a.name)}>+</button>
                  <button onClick={() => decrementBaseValue(a.name)}>-</button>
                </li>
              )
            }
          </ul>
        </section>
        <section>
          <h4>Saves</h4>
          <ul>

            {
              Object.values(characterData.saves).map(s =>
                <li key={`character-save-${s.name}`} >
                  <input
                    type="checkbox"
                    checked={s.isProficient}
                    onChange={(event) => saveProficiencyChanged(s.name)}
                  />
                  <span onClick={() => saveProficiencyChanged(s.name)}> {s.name} {s.finalValue}</span>
                </li>
              )
            }
          </ul>
        </section>
          <h4>Skills</h4>
          <ul>
            {Object.values(characterData.skills).map(s =>
              <li key={`character-skill-${s.name}`}>
                <input
                  type="checkbox"
                  checked={s.isProficient}
                  onChange={() => skillProfiencyChanged(s.name)}
                />

                <span onClick={() => skillProfiencyChanged(s.name)}>
                  {s.name} {s.modifier}
                </span>

              </li>
            )}
          </ul>
      </section>
  );
}

function Ability(props) {
  let { name, modifier, baseValue, finalValue, updateBaseValue } = props
  return <li key={`character-ability-${name}`}>
    <span>
      {name} {finalValue} {(modifier >= 0) ? "+" : "-"}{modifier}
    </span>
    <button onClick={() => updateBaseValue(name, baseValue + 1)}>+</button>
    <button>-</button>
  </li>
}

function MultiLevelCheckbox({ level, levelUpdate, maxLevels = 1 }) {
  // Make selections in sequence
  // levelChanged: fn( level: int )
  //  - level: the current level of the check box, from 0 (unchecked) to 2 (both checked)

  const _levelChanged = (val) => {
    if (val === level && level > 0) {
      levelUpdate(level - 1)
      return
    }
    levelUpdate(val)
  }

  return (
    <div>
      {
        (() => {
          const result = []
          for (let i = 1; i <= maxLevels; i++) {
            result.push(<input key={`multi-level-${i}`} type="checkbox" checked={level >= i} onChange={() => _levelChanged(i)} />)
          }
          return result
        })()
      }
    </div>
  );

}

export default CharacterGenerator;
