import {
  SwadeCharacter,
  SwadeSkill,
  SwadeAttribute,
} from "../core/swade/swade-character";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { SteppedValue } from "../components/common/StepValueNumericInput";

function useSwadeCharacter() {
  const [wrapper, setWrapper] = useState({ character: new SwadeCharacter() });

  useEffect(() => {
    updateData();
  }, []);

  const actions = {
    incrementAttribute(name: string) {
      wrapper.character.attributes[name].incrementDieRank();
      updateData();
    },
    decrementAttribute(name: string) {
      wrapper.character.attributes[name].decrementDieRank();
      updateData();
    },
    incrementSkill(name: string) {
      wrapper.character.skills[name].incrementValue();
      updateData();
    },
    decrementSkill(name: string) {
      wrapper.character.skills[name].decrementValue();
      updateData();
    },
  };
  function updateData() {
    setWrapper((prev) => ({ ...prev, character: prev.character }));
  }
  return { character: wrapper.character, ...actions };
}

export function SwadeCharacterPage() {
  const {
    character,
    incrementSkill,
    decrementSkill,
    incrementAttribute,
    decrementAttribute,
  } = useSwadeCharacter();
  return (
    <Layout>
      <div className="swade-character">
        Total Points: {`${character.totalPoints}`}
        <div className="card">
          Attributes:
          <div>{`Attribute Points: ${character.totalAttributePoints}`}</div>
          {Object.values(character.attributes).map((att: SwadeAttribute) => (
            <SwadeAttributeDisplay
              key={att.name}
              attribute={att}
              increment={() => incrementAttribute(att.name)}
              decrement={() => decrementAttribute(att.name)}
            />
          ))}
        </div>
        <div className="card">
          Skills:
          <br></br>
          {Object.values(character.skills).map((skill: SwadeSkill) => (
            <SwadeSkillDisplay
              key={skill.name}
							skill={skill}
              increment={() => incrementSkill(skill.name)}
              decrement={() => decrementSkill(skill.name)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function SwadeAttributeDisplay({
  attribute,
  increment,
  decrement,
}: {
  attribute: SwadeAttribute;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className="swade-attributes__item">
      <span>{`${attribute.displayName} [${attribute.points}]: `}</span>
      <SteppedValue
        displayText={`${attribute.dieRank}`}
        increment={increment}
        decrement={decrement}
      />
    </div>
  );
}

function SwadeSkillDisplay({
	skill,
  increment,
  decrement,
}: {
	skill: SwadeSkill;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className="swade-skills__item">
      {`${skill.isCore ? "X" : ""} ${skill.displayName} (${skill.derivedAttribute.displayName}) [${skill.points}]`}
      <SteppedValue
        displayText={`${skill.value}`}
        increment={increment}
        decrement={decrement}
      />
    </div>
  );
}
