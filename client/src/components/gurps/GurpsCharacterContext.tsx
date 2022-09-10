import { createContext, useContext, useEffect, useState } from "react";
import {
  GurpsBasicAttribute,
  GurpsCharacterModel,
  GurpsSkill,
  SimpleNegativeTrait,
  SimplePositiveTrait,
  SkillDifficulty,
} from "../../core/gurps/GurpsCharacter";

const characterContext = createContext<
  ({ character: GurpsCharacterModel } & GurpsCharacterActions) | undefined
>(undefined);

interface GurpsCharacterActions {
  incrementBasicTrait: (name: string) => void;
  decrementBasicTrait: (name: string) => void;
  incrementSkill: (name: string) => void;
  decrementSkill: (name: string) => void;
  addSkill: (name: string, attribute: string, difficulty: string) => void;
  removeSkill: (key: string) => void;
  addPositiveExtraTrait: (name: string, cost: number) => void;
  addNegativeExtraTrait: (name: string, cost: number) => void;
  removePositiveExtraTrait: (key: string) => void;
  removeNegativeExtraTrait: (key: string) => void;
  clear: () => void;
}

export function GurpsCharacterProvider({ children }: any) {
  const [wrapper, setWrapper] = useState({
    character: new GurpsCharacterModel(),
  });

  const [model, setModel] = useState({});

  useEffect(() => {
    wrapper.character.addSkill(
      new GurpsSkill(
        "Brawling",
        wrapper.character.basicTraits.dexterity,
        SkillDifficulty.E
      )
    );
    wrapper.character.addSkill(
      new GurpsSkill(
        "Boxing",
        wrapper.character.basicTraits.dexterity,
        SkillDifficulty.A
      )
    );
    wrapper.character.addSkill(
      new GurpsSkill(
        "Karate",
        wrapper.character.basicTraits.dexterity,
        SkillDifficulty.H
      )
    );
    wrapper.character.addSkill(
      new GurpsSkill(
        "Surgery",
        wrapper.character.basicTraits.intelligence,
        SkillDifficulty.VH
      )
    );
    update();
  }, []);

  const update = () => {
    setWrapper((prev) => ({ ...prev, character: prev.character }));
  };

  const actions: GurpsCharacterActions = {
    incrementBasicTrait: (name: string) => {
      wrapper.character.basicTraits[name].increment();
      update();
    },
    decrementBasicTrait: (name: string) => {
      wrapper.character.basicTraits[name].decrement();
      update();
    },
    incrementSkill: (name: string) => {
      wrapper.character.skills[name].increment();
      update();
    },
    decrementSkill: (name: string) => {
      wrapper.character.skills[name].decrement();
      update();
    },

    addSkill: (name: string, attribute: string, difficulty: string) => {
      let att = wrapper.character.basicTraits[attribute];
      let diff = (() => {
        switch (difficulty) {
          case "E":
            return SkillDifficulty.E;
          case "A":
            return SkillDifficulty.A;
          case "H":
            return SkillDifficulty.H;
          case "VH":
            return SkillDifficulty.VH;
          default:
            throw new Error("No Matching Skill Difficulty For New Skill");
        }
      })();

      wrapper.character.addSkill(
        new GurpsSkill(name, att as GurpsBasicAttribute, diff)
      );
      update();
    },
    removeSkill: (key: string) => {
      wrapper.character.removeSkill(key);
      update();
    },

    addPositiveExtraTrait: (name: string, cost: number): void => {
      wrapper.character.addPositiveExtra(new SimplePositiveTrait(name, cost));
      update();
    },

    addNegativeExtraTrait: (name: string, cost: number): void => {
      wrapper.character.addNegativeExtra(new SimpleNegativeTrait(name, cost));
      update();
    },
    removePositiveExtraTrait: function (key: string): void {
      wrapper.character.removePositiveExtra(key);
      update();
    },
    removeNegativeExtraTrait: function (key: string): void {
      wrapper.character.removeNegativeExtra(key);
      update();
    },
    clear: function (): void {
      wrapper.character = new GurpsCharacterModel();
      update();
    },
  };
  const value = {
    character: wrapper.character,
    ...actions,
  };

  return (
    <characterContext.Provider value={value}>
      {children}
    </characterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(characterContext);

  if (context === undefined) {
    throw new Error("useCharacter must be used within an appropriate Provider");
  }

  return context;
}
