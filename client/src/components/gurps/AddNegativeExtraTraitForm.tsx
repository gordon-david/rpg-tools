import { useState } from "react";
import { useCharacter } from "./GurpsCharacterContext";

export function AddNegativeExtraTraitForm() {
    const { addNegativeExtraTrait } = useCharacter();
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);

    const handleNameChange = (e: any) => {
        e.preventDefault();
        setName((prev) => e.target.value);
    };

    const handleCostChange = (e: any) => {
        e.preventDefault();
        let val = e.target.value;
        if (typeof val !== "number" && val !== "-") {
            val = parseInt(val);
        }
        setCost((prev) => val);
    };

    const save = (e: any) => {
        e.preventDefault();
        addNegativeExtraTrait(name, cost);
        setName((prev) => "");
        setCost((prev) => 0);
    };

    return (
        <form>
            <div>
                <label htmlFor="negname">Name: </label>
                <input
                    type="text"
                    name="name"
                    id="negname"
                    value={name}
                    onChange={handleNameChange} />
            </div>
            <div>
                <label htmlFor="negcost">Cost: </label>
                <input
                    type="number"
                    name="cost"
                    id="negcost"
                    value={cost}
                    max={0}
                    onChange={handleCostChange} />
            </div>
            <button type="submit" onClick={save}>
                Save
            </button>
        </form>
    );
}
