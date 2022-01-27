import { ITrait } from "../../core/gurps/GurpsCharacter";
import { SteppedValue } from "../common/StepValueNumericInput";
import { useCharacter } from "./GurpsCharacterContext";

export function Attribute({ attribute }: { attribute: ITrait; }) {
    const {
        incrementBasicTrait: incrementBasicAttribute, decrementBasicTrait: decrementBasicAttribute,
    } = useCharacter();

    return (
        <div
            key={`gurps-attribute-${attribute.key}`}
            className={`gurps-attributes__item gurps-attribute-${attribute.key}`}
        >
            <span className="gurps-attribute__item__display-text">
                {attribute.displayName} ({attribute.abbreviation})
            </span>
            <SteppedValue
                increment={() => incrementBasicAttribute(attribute.key)}
                decrement={() => decrementBasicAttribute(attribute.key)}
                displayText={`${attribute.value} [${attribute.points}]`}
            />
        </div>
    );
}
