import { useState } from "react";
import { useCharacter } from "./GurpsCharacterContext";

export function AddPositiveExtraTraitForm() {
  const { addPositiveExtraTrait } = useCharacter();
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setName((prev) => e.target.value);
  };

  const handleCostChange = (e: any) => {
    e.preventDefault();
    let val = e.target.value;
    if (typeof val !== "number") {
      val = parseInt(val);
    }
    setCost((prev) => val);
  };

  const save = (e: any) => {
    e.preventDefault();
    if (!validateInputs(name, cost)) {
      return;
    }
    addPositiveExtraTrait(name, cost);
    setName((prev) => "");
    setCost((prev) => 0);
  };

  function validateInputs(name: string, cost: number) {
    if (!name || name.trim() === "") {
      return false;
    }

    if (cost < 0) {
      return false;
    }
    return true;
  }
  return (
    <form>
      <div>
        <label htmlFor="posname">Name: </label>
        <input
          type="text"
          name="name"
          id="posname"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="poscost">Cost: </label>
        <input
          type="number"
          name="cost"
          id="poscost"
          value={cost}
          min={0}
          onChange={handleCostChange}
        />
      </div>
      <button type="submit" onClick={save}>
        Save
      </button>
    </form>
  );
}
