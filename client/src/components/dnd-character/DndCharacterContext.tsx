import { DNDCharacter } from "../../core/dnd/DNDCharacter";
import { createContext, useContext, useState } from "react";

const characterContext = createContext<{
  character: DNDCharacter,
  incrementProficiency: () => void, 
  decrementProficiency: () => void, 
  incrementBaseValue: (name: string) => void, 
  decrementBaseValue: (name: string) => void, 
  saveProficiencyToggle: (name: string) => void, 
  skillProficiencyToggle: (name: string) => void,
  clear: () => void
} | undefined>(undefined);

export function DNDCharacterProvider({ children }: any) {
  const [wrapper, setWrapper] = useState({ character: new DNDCharacter() });

  const incrementBaseValue = (abilityName: string) => {
    wrapper.character.abilities[abilityName].baseValue += 1
    setWrapper({character: wrapper.character})
  }

  const decrementBaseValue = (abilityName: string) => {
    wrapper.character.abilities[abilityName].baseValue -= 1
    setWrapper({character: wrapper.character})
  }

  const saveProficiencyToggle = (saveName: string) => {
    wrapper.character.saves[saveName].isProficient = !wrapper.character.saves[saveName].isProficient
    setWrapper({character: wrapper.character})
  }

  const incrementProficiency = () => {
    wrapper.character.proficiencyBonus.value += 1
    setWrapper({character: wrapper.character})
  }

  const decrementProficiency = () => {
    wrapper.character.proficiencyBonus.value -= 1
    setWrapper({character: wrapper.character})
  }

  const skillProficiencyToggle = (skillName: string) => {
    wrapper.character.skills[skillName].isProficient = !wrapper.character.skills[skillName].isProficient
    setWrapper({character: wrapper.character})
  }

  const value = {
    character: wrapper.character,
    incrementProficiency,
    decrementProficiency,
    incrementBaseValue,
    decrementBaseValue,
    saveProficiencyToggle,
    skillProficiencyToggle,
    clear: function(){
      setWrapper({character: new DNDCharacter()})
    }
    
  };

  return (
    <characterContext.Provider value={value}>
      {children}
    </characterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(characterContext)

  if(context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }

  return context
}