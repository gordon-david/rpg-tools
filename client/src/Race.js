import { useEffect, useState } from "react"

export default function Race(){

  const [races_data, setraces_data] = useState()

  useEffect(() => {
    async function fetchRaces(){
      let response = await fetch("/static/data/races.json")
      response = await response.json()
      setraces_data(response)
    }

    fetchRaces()

  }, [])

  return (
    <div>
      <ol>
        {
         (races_data) ? races_data["race"].map(r => <li>{r.name}</li>) : ""
        }
      </ol>
    </div>
  )
}