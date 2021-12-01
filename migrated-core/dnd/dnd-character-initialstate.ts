export default function getInitialState() {
  return {
    abilities: {
      strength: { bonuses: [], baseValue: 10, finalValue: 10, modifier: 0 },
      dexterity: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      intelligence: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      constitution: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      charisma: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      wisdom: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 }
    },
    skills: {
      athletics: { derivedAbility: "strength", isProficient: false, modifier: 0 },
      acrobatics: { derivedAbility: "dexterity", isProficient: false, modifier: 0 },
      sleight_of_hand: {
        derivedAbility: "dexterity",
        isProficient: false,
        modifier: 0
      },
      stealth: { derivedAbility: "dexterity", isProficient: false, modifier: 0 },
      arcana: { derivedAbility: "intelligence", isProficient: false, modifier: 0 },
      history: { derivedAbility: "intelligence", isProficient: false, modifier: 0 },
      investigation: {
        derivedAbility: "intelligence",
        isProficient: false,
        modifier: 0
      },
      nature: { derivedAbility: "intelligence", isProficient: false, modifier: 0 },
      religion: { derivedAbility: "intelligence", isProficient: false, modifier: 0 },
      animal_handling: { derivedAbility: "wisdom", isProficient: false, modifier: 0 },
      insight: { derivedAbility: "wisdom", isProficient: false, modifier: 0 },
      medicine: { derivedAbility: "wisdom", isProficient: false, modifier: 0 },
      perception: { derivedAbility: "wisdom", isProficient: false, modifier: 0 },
      survival: { derivedAbility: "wisdom", isProficient: false, modifier: 0 },
      deception: { derivedAbility: "charisma", isProficient: false, modifier: 0 },
      intimidation: { derivedAbility: "charisma", isProficient: false, modifier: 0 },
      performance: { derivedAbility: "charisma", isProficient: false, modifier: 0 },
      persuasion: { derivedAbility: "charisma", isProficient: false, modifier: 0 }
    },
    saves: {
      strength: {
        bonuses: [],
        baseValue: 10,
        finalValue: 10,
        isProficient: false,
        modifier: 0
      },
      dexterity: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      intelligence: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      constitution: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      charisma: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      wisdom: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      }
    },
    proficiencyBonus: 3,
  };
}
