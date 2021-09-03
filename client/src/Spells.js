import { useEffect, useState } from "react"

export default function Spells() {

  const [spells_data, setspells_data] = useState({})
  const [tableSort, setTableSort] = useState({column: "name", direction: true})

  useEffect(() => {
    async function fetchSpells() {
      let response = await fetch("/static/data/spells.json")
      response = await response.json()
      let spells = {}
      response["spell"].forEach(element => {
        spells[element.name] = element
      });
      setspells_data(spells)
    }

    fetchSpells()
  }, [])

  useEffect(() => {
    console.log(spells_data[0])
  })

  const sortByName = () => {
    if(tableSort.column === "name"){
      setTableSort(prev => ({...prev, direction: !prev.direction}))
    }
  }

  return (
    <div>
      <table>
        <tr>
          <th onClick={sortByName} >Name</th>
          <th>Level</th>
          <th>School</th>
        </tr>
        {
          Object.keys(spells_data).map(s => <tr>
            <td>{s}</td>
            <td>{spells_data[s]["level"]}</td>
            <td>{spells_data[s]["school"]}</td>
          </tr>)
        }

      </table>
    </div>
  )
}