import { useCharacter } from "./GurpsCharacterContext";

export function GurpsCharacterPrettyPrint() {
  const { character } = useCharacter();

  return (
    <div className=" card gurps-character--pretty-print">
      <h3 className="card__header gurps-character--pretty-print__title">
        Character Sheet Output:
      </h3>
      <div className="card__content">
        <div className="gurps-character--pretty-print__section">
          <h4 className="gurps-character--pretty-print__section__header">
            Basic Attributes
          </h4>
          {Object.keys(character.basicTraits).map((k) => {
            const trait = character.basicTraits[k];
            return (
              <div>{`${trait.displayName} (${trait.abbreviation}) ${trait.value} ${trait.points} .pts`}</div>
            );
          })}
        </div>
        {Object.keys(character.extraPositiveTraits).length > 0 ? (
          <div className="gurps-character--pretty-print__section">
            <h4 className="gurps-character--pretty-print__section__header">
              Attributes and Perks
            </h4>
            {Object.keys(character.extraPositiveTraits).map((k) => {
              const trait = character.extraPositiveTraits[k];
              return <div> {`${trait.displayName} ${trait.points}`} </div>;
            })}
          </div>
        ) : (
          ``
        )}
        {Object.keys(character.extraNegativeTraits).length > 0 ? (
          <div className="gurps-character--pretty-print__section">
            <h4 className="gurps-character--pretty-print__section__header">
              Disadvantages and Quirks
            </h4>
            {Object.keys(character.extraNegativeTraits).map((k) => {
              const trait = character.extraNegativeTraits[k];
              return <div> {`${trait.displayName} ${trait.points}`} </div>;
            })}
          </div>
        ) : (
          ``
        )}

        {Object.keys(character.skills).length > 0 ? (
          <div className="gurps-character--pretty-print__section">
            <h4 className="gurps-character--pretty-print__section__header">
              Skills
            </h4>
            {Object.keys(character.skills).map((k) => {
              const trait = character.skills[k];
              return (
                <div>{`${trait.displayName} (${trait.derivedAttribute.abbreviation}/${trait.skillDifficulty}) ${trait.value} [${trait.points}]`}</div>
              );
            })}
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  );
}
