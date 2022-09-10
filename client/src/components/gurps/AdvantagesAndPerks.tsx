import { SimplePositiveTrait } from "../../core/gurps/GurpsCharacter";

export function AdvantagesAndPerks({ trait }: { trait: SimplePositiveTrait }) {
  return (
    <div key={trait.key}>
      {trait.displayName} {trait.points}
    </div>
  );
}
