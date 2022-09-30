import { SwadeCharacter, SwadeSkill, SkillNames, AttributeNames } from "../core/swade/swade-character";
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
      <div className="swade-character">
        Total Points: {`${characterData.totalPoints}`}
        <div className="card">
          Attributes:
            <div>{`Attribute Points: ${characterData.totalAttributePoints}`}</div>
            {Object.values(characterData.attributes).map((att: any) => (
              <SwadeAttributeDisplay
                key={att.name}
                name={att.name}
                points={att.points}
                dieRank={att.dieRank}
                increment={() => incrementAttribute(att.name)}
                decrement={() => decrementAttribute(att.name)}
              />
            ))}
        </div>
<div className="card">
        Skills:
        <br></br>
          {Object.values(characterData.skills).map((skill: any) => (
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
      </div>
</div>
    </Layout>
  );
}

function SkillsSection({
  skills = [],
  points = "",
}: {
  skills: SwadeSkill[];
  points: string;
}) {}

function SwadeAttributeDisplay({
  name,
  points,
  dieRank,
  increment,
  decrement,
}: {name: string, points: string, dieRank: string, increment:() => void, decrement: () => void, isCore: boolean}) {
  return (
    <div className="swade-attributes__item">
      <span>{`${SkillNames[name]} [${points}]: `}</span>
      <SteppedValue
        displayText={`${dieRank}`}
        increment={increment}
        decrement={decrement}
      />
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
}: {name: string, points: string, dieRank: string, increment:() => void, decrement: () => void, isCore: boolean}) {
  return (
    <div className="swade-skills__item">
{`${isCore ? 'X' : ''} ${name} [${points}]`}
<SteppedValue displayText={dieRank} increment={increment} decrement={decrement} />
    </div>
  );
}
