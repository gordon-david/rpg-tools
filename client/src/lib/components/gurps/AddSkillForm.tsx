import { ChangeEvent, useState } from "react";
import { useCharacter } from "./GurpsCharacterContext";

export function AddSkillForm() {
  const { character, addSkill } = useCharacter();
  const [attSelect, setAttSelect] = useState("dexterity");
  const [diffSelect, setDiffSelect] = useState("E");
  const [name, setName] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleAttSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setAttSelect(e.target.value);
  };

  const clearSelections = (e: any) => {
    setName("");
    setAttSelect("");
    setDiffSelect("");
  };
  const saveSelections = (e: any) => {
    e.preventDefault();
    if (!validateInput(attSelect, diffSelect, name)) {
      return;
    }
    addSkill(name, attSelect, diffSelect);
    setName("");
    setAttSelect("");
    setDiffSelect("");
  };

  const handleDiffSelect = (e: any) => {
    // e.preventDefault();
    setDiffSelect(e.target.value);
  };

  const validateInput = (
    attSelect: string,
    diffSelect: string,
    name: string
  ) => {
    if (!name || name.trim() === " ") {
      return false;
    }

    return true;
  };

  return (
    <form>
      <div>
        <label htmlFor="skillname">Name: </label>
        <input
          required
          type="text"
          name="name"
          id="skillname"
          value={name}
          onChange={(e) => handleNameChange(e)}
        />
      </div>
      <div>
        <label htmlFor="attribute">Attribute: </label>
        <select
          name="attribute"
          id="attribute"
          value={attSelect}
          onChange={(e) => handleAttSelect(e)}
        >
          {/* <option label=" "> </option> */}
          <option value="dexterity">DX</option>
          <option value="intelligence">IQ</option>
          <option value="perception">Per</option>
          <option value="will">Will</option>
          <option value="health">HT</option>
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={diffSelect}
          onChange={(e) => handleDiffSelect(e)}
        >
          {/* <option label=" "></option> */}
          <option value="E">E</option>
          <option value="A">A</option>
          <option value="H">H</option>
          <option value="VH">VH</option>
        </select>
      </div>
      <button onClick={(e) => clearSelections(e)}>clear</button>
      <button onClick={(e) => saveSelections(e)}>save</button>
    </form>
  );
}
