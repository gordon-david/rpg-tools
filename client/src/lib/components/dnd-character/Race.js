import { useEffect, useState } from "react";
let _data = require("../../data/races.json");

export default function Race() {
  const [races_data] = useState(_data);

  useEffect(() => {
    // async function fetchRaces(){
    //   let response = await fetch("/static/data/races.json")
    //   response = await response.json()
    //   setraces_data(_data)
    // }
    // fetchRaces()
  }, []);

  return (
    <div>
      <ol>
        {races_data ? races_data["race"].map((r) => <li>{r.name}</li>) : ""}
      </ol>
    </div>
  );
}
