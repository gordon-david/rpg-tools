import { AddNegativeExtraTraitForm } from "./AddNegativeExtraTraitForm";
import { AddPositiveExtraTraitForm } from "./AddPositiveExtraTraitForm";
import { AddSkillForm } from "./AddSkillForm";
import { AdvantagesAndPerks } from "./AdvantagesAndPerks";
import { Attribute } from "./Attribute";
import { DisadvantagesAndQuirks } from "./DisadvantagesAndQuirks";
import {
    GurpsCharacterProvider,
    useCharacter,
} from "./GurpsCharacterContext";
import { GurpsCharacterPrettyPrint } from "./GurpsCharacterPrettyPrint";
import { SkillList } from "./SkillList";

export function GurpsCharacter() {
    return (
        <GurpsCharacterProvider>
            <GurpsCharacterContainer />
            <GurpsCharacterPrettyPrint />
        </GurpsCharacterProvider>
    );
}

function GurpsCharacterContainer() {
    const { character, clear } = useCharacter();

    return (
        <section className="gurps-character">
            <div className="gurps-character__section">
                <span>Points: {character.totalPoints}</span>
                <button onClick={clear}>clear</button>
            </div>
            <div className="card gurps-character__section">
                <h4 className="card__header">Basic Attributes</h4>
                <Attribute attribute={character.basicTraits.strength} />
                <Attribute attribute={character.basicTraits.dexterity} />
                <Attribute attribute={character.basicTraits.intelligence} />
                <Attribute attribute={character.basicTraits.health} />
            </div>
            <div className="card gurps-character__section">
                <h4 className="card__header">Secondary Characteristics</h4>
                <Attribute attribute={character.basicTraits.hitPoints} />
                <Attribute attribute={character.basicTraits.fatiguePoints} />
                <Attribute attribute={character.basicTraits.will} />
                <Attribute attribute={character.basicTraits.basicSpeed} />
                <Attribute attribute={character.basicTraits.basicMove} />
            </div>
            <div className="card gurps-character__section">
                <h4 className="card__header">Advantages and Perks</h4>
                <AddPositiveExtraTraitForm />
                {Object.keys(character.extraPositiveTraits).map((t) => (
                    <AdvantagesAndPerks trait={character.extraPositiveTraits[t]} />
                ))}
            </div>
            <div className="card gurps-character__section">
                <h4 className="card__header">Disadvantages and Quirks</h4>
                <AddNegativeExtraTraitForm />
                {Object.keys(character.extraNegativeTraits).map((t) => (
                    <DisadvantagesAndQuirks trait={character.extraNegativeTraits[t]} />
                ))}
            </div>
            <div className="card gurps-character__section">
                <h4 className="card__header">Skills</h4>
                <AddSkillForm />
                <SkillList />
            </div>
        </section>
    );
}