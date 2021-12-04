import { useEffect, useState, useContext } from "react"
import SpellModal from "./SpellModal"
import SpellTable from "./SpellTable"
import SpellsContext, { Consumer } from "./SpellsContext"
let _data = require("../data/spells.json")

export default function Spells() {

  const [spells_data, setspells_data] = useState(_data["spell"])

  return (
    <div>
      <SpellTable />
    </div>
  )
}

