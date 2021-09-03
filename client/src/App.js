import { useState } from "react"
import CharacterGenerator from "./CharacterGenerator"
import Race from "./Race"
import Spells from "./Spells"

const selection = {
  "characterGenerator": 0,
  "race": 1,
  "spells": 2

}

export default function App() {

  const [select, setSelect] = useState(2)

  return (<div className="App">
    <header className="App-header">
      <button onClick={() => setSelect(0)}>CharacterGenerator</button>
      <button onClick={() => setSelect(1)}>Race</button>
      <button onClick={() => setSelect(2)}>Spells</button>

    </header>
    {
      (() => {
        if (select === selection.characterGenerator) { return <CharacterGenerator /> }
        if (select === selection.race) { return <Race /> }
        if (select === selection.spells) {return <Spells />}
      })()
    }
  </div>)
}