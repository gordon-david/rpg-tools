import {dnd_character} from "./dnd-character";

const Generators = {
  generateDnDCharacter: () => {
    // init character object
    const character = dnd_character();

    // generate ability array
    const abilityRolls = [];
    for (let i = 0; i < 6; i++) {
      let rolls = [];
      for (let j = 0; j < 4; j++) {
        rolls.push(Math.floor(Math.random() * 5) + 1);
      }
      rolls.sort();
      rolls.splice(0, 1);
      abilityRolls.push(rolls.reduce((e, sum) => e + sum, 0));
    }

    // Apply random ability rolls to each character ability
    Object.keys(character.abilities).forEach(e => {
      character.abilities[e].BaseValue = abilityRolls.pop();
    });

    // randomly select 5 skill proficiencies
    const skillProficiencies = new Array(18)
      .fill(true, 0, 5)
      .fill(false, 5, 18);

    // apply skill proficiencies randomly
    Object.keys(character.skills).forEach(e => {
      character.skills[e].IsProficient = skillProficiencies.splice(
        Math.floor(Math.random() * skillProficiencies.length - 1),
        1
      )[0];
    });

    return character;
  }
};

export default Generators;
