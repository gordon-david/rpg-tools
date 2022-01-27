import { GurpsSkill } from "../../core/gurps/GurpsCharacter";
import { SteppedValue } from "../common/StepValueNumericInput";
import { useCharacter } from "./GurpsCharacterContext";

export function Skill({ skill }: { skill: GurpsSkill; }) {
    const { incrementSkill, decrementSkill } = useCharacter();
    return (
        <li
            key={`gurps-skill-${skill.key}`}
            className={`gurps-skills__item gurps-skill-${skill.key}`}
        >
            <span className="gurps-skills__item__display-text"> {`${skill.displayName} (${skill.derivedAttribute.abbreviation}/ ${skill.skillDifficulty})`} </span>
            <SteppedValue
                displayText=
                {`${skill.value}: ${skill.points} pts.`}
                increment={() => incrementSkill(skill.key)}
                decrement={() => decrementSkill(skill.key)}
            />
        </li>
    );
}
