import { Spell } from "./Spell"
const _data = require("../../data/spells.json")

export class SpellsContainer {
  filters: {
    "classes": string[],
    "excludeComponents": {
      "v": boolean,
      "s": boolean,
      "m": boolean
    },
    "schools": string[]
  } =
    {
      "classes": [],
      "excludeComponents": {
        "v": false,
        "s": false,
        "m": false
      },
      "schools": []
    }
  spells: Spell[] = []

  constructor() {
    this.spells = _data["spell"].map((d: any) => Spell.fromJSON(d))
  }

  build() {

  }
}