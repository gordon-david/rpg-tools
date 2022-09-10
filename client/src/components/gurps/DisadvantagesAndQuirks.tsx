import { SimpleNegativeTrait } from "../../core/gurps/GurpsCharacter";

export function DisadvantagesAndQuirks({
  trait,
}: {
  trait: SimpleNegativeTrait;
}) {
  return (
    <div key={trait.key}>
      {trait.displayName} {trait.points}
    </div>
  );
}
