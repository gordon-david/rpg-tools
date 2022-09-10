import { SwadeCharacter } from "../core/swade/swade-character";
import { useState, useEffect } from "react";

export function SwadeCharacterPage() {
  const [character] = useState(new SwadeCharacter());

  useEffect(() => {
    console.log(character.attributes);
  });
  return (
    <div>
      {character.totalPoints}
      {Object.values(character.attributes).map((att) => (
        <SwadeAttributeDisplay key={att.name} attribute={att} />
      ))}
    </div>
  );
}

function SwadeAttributeDisplay({ attribute }: any) {
  return (
    <div>
      {attribute.name} {attribute.points} {attribute.dieRank}
      <button onClick={() => attribute.incrementDieRank()}>+</button>
    </div>
  );
}
