import { useCharacter } from "./GurpsCharacterContext";
import { Skill } from "./Skill";

export function SkillList() {
    const { character } = useCharacter();
    return (
        <ul className="gurps-skills">
            {Object.keys(character.skills).map((k) => (
                <Skill
                    key={`gurps-skill-${character.skills[k].key}`}
                    skill={character.skills[k]} />
            ))}
        </ul>
    );
}
