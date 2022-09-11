import { SwadeCharacter } from "../core/swade/swade-character";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { SteppedValue } from "../components/common/StepValueNumericInput";

export function SwadeCharacterPage() {
  const [character] = useState(new SwadeCharacter());
  const [characterData, setCharacterData] = useState<null | any>(null);

  useEffect(() => {
    updateData();
  }, []);

  function incrementAttribute(name: string) {
    character.attributes[name].incrementDieRank();
    updateData();
  }
  function decrementAttribute(name: string) {
    character.attributes[name].decrementDieRank();
    updateData();
  }
  function incrementSkill(name: string) {
    character.skills[name].incrementValue();
    updateData();
  }
  function decrementSkill(name: string) {
    character.skills[name].decrementValue();
    updateData();
  }

  function updateData() {
    let data: any = {
      attributes: {},
      skills: {},
    };
    Object.values(character.attributes).forEach(
      (att) =>
        (data.attributes[att.name] = {
          name: att.name,
          dieRank: att.dieRank,
          points: att.points,
        })
    );

    Object.values(character.skills).forEach(
      (skill) =>
        (data.skills[skill.name] = {
          name: skill.name,
          dieRank: skill.value,
          points: skill.points,
          isCore: skill.isCore,
        })
    );
    data.totalPoints = character.totalPoints;
    data.totalSkillPoints = character.totalSkillPoints;
    data.totalAttributePoints = character.totalAttributePoints;

    setCharacterData(() => data);
  }

  return (
    <Layout>
      Total Points: {characterData && characterData.totalPoints}
      <br></br>
      Attributes:
      {characterData && [
        Object.values(characterData.attributes).map((att: any) => (
          <SwadeAttributeDisplay
            key={att.name}
            name={att.name}
            points={att.points}
            dieRank={att.dieRank}
            increment={() => incrementAttribute(att.name)}
            decrement={() => decrementAttribute(att.name)}
          />
        )),
      ]}
      Skills:
      <br></br>
      {characterData &&
        Object.values(characterData.skills).map((skill: any) => (
          <SwadeSkillDisplay
            key={skill.name}
            name={skill.name}
            points={skill.points}
            dieRank={skill.dieRank}
            increment={() => incrementSkill(skill.name)}
            decrement={() => decrementSkill(skill.name)}
            isCore={skill.isCore}
          />
        ))}
    </Layout>
  );
}

function SwadeAttributeDisplay({
  name,
  points,
  dieRank,
  increment,
  decrement,
}: any) {
  return (
    <div>
      {name} {points} {dieRank}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

function SwadeSkillDisplay({
  name,
  points,
  dieRank,
  increment,
  decrement,
  isCore,
}: any) {
  return (
    <div>
      {name} {points} {dieRank} isCore: {isCore ? "True" : "False"}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
