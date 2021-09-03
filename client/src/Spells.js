import { useEffect, useState } from "react"

export default function Spells() {

  const [spells_data, setspells_data] = useState([])
  // const [tableSort, setTableSort] = useState({ column: "name", direction: true })

  useEffect(() => {
    async function fetchSpells() {
      let response = await fetch("/static/data/spells.json")
      response = await response.json()
      let spells = {}
      // response["spell"].forEach(element => {
      //   spells[element.name] = element
      // });
      // console.log(response)
      setspells_data(response["spell"])
    }

    fetchSpells()
  }, [])

  // useEffect(() => console.log(spells_data))

  // const sortByName = () => {
  //   if (tableSort.column === "name") {
  //     setTableSort(prev => ({ ...prev, direction: !prev.direction }))
  //   }
  // }

  return (
    <div>
      <SpellTable columns={["name", "level", "school", "classes", "components"]} data={spells_data} />
    </div>
  )
}

const SpellTable = ({ columns = [], data = [] }) => {
  const defaultDisplayIndexes = () => [...Array(data.length).keys()]

  const sortBy = { column: "name", ascending: true }
  const [displayedIndexes, setDisplayedIndexes] = useState([])

  useEffect(() => {
    setDisplayedIndexes([...defaultDisplayIndexes()])
  }, [data])

  const setSortBy = (column) => {
    let temp = defaultDisplayIndexes()
    if (column === sortBy.column) {
      temp.reverse()
    }
    sortBy.column = column
    setDisplayedIndexes([...temp])
  }

  // useEffect(() => console.log("display:", displayedIndexes))

  const classesText = (row) => row["classes"]["fromClassList"].map(e => e.name).join(", ")
  const componentsText = (row) => Object.keys(row["components"]).join(", ")
  const schoolText = (row) => {
    const schools = {
      A: "Abjuration",
      C: "Conjuration",
      D: "Divination",
      E: "Enchantment",
      V: "Evocation",
      I: "Illusion",
      N: "Necromancy",
      T: "Transmutation",
    }
    return schools[row["school"]]
  }

  return <table>
    <tr>
      {columns.map(e => <th onClick={() => setSortBy("name")}>{String(e).charAt(0).toUpperCase() + String(e).slice(1)}</th>)}
    </tr>
    {
      displayedIndexes.map(index => {
        const row = data[index]
        return <tr>
          {columns.map((content) => {
            if (content === "classes") return <td>{classesText(row)}</td>
            if (content === "components") return <td>{componentsText(row)}</td>
            if (content === "school") return <td>{schoolText(row)}</td>
            return <td>{`${row[content]}`}</td>
          })}
        </tr>
      })}
  </table>
}