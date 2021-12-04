export interface ISpell {
  name: string,
  source: string,
  page: number,
  srd?: boolean,
  level: number,
  school: string,
  components?: {
    v?: boolean,
    s?: boolean,
    m?: string | {
      text?: string,
      cost?: number,
      consume?: boolean
    }
  },
  duration?: { type: "instant" }[]
  | { type: "special" }[]
  | {
    type: "permanent",
    ends: ["dispel"] | ["dispel", "trigger"]
  }[]
  | {
    type: "timed",
    concentration?: boolean,
    duration: {
      type: "round" | "minute" | "hour" | "day",
      amount: number,
      upTo?: boolean
    }
  }[],
  range?: {
    type: "cone"
    | "cube"
    | "hemisphere"
    | "line"
    | "point"
    | "radius"
    | "special"
    | "sphere",
    distance?: {
      amount?: number,
      type?: "feet"
      | "miles"
      | "self"
      | "sight"
      | "touch"
      | "unlimited"
    }
  }
  classes: {
    fromClassList: {
      name: string,
      source: string
    }[],
    fromSubClassList: {
      class: {
        name: string,
        source: string
      },
      subclass: {
        name: string,
        source: string
      }
    }[]
  }
}

export class Spell {
  name: string = ""
  level: number = 0
  school: string = ""
  classes: string[] = []
  components: string[] = []
  castingTime: string = ""
  range: string = ""
  duration: string = ""
  entries: string[] = []

  constructor(name: string,
    { level, school, classes, components, castingTime, range, duration, entries }
      : {
        level: number,
        school: string,
        classes: string[],
        components: string[],
        castingTime: string,
        range: string,
        duration: string,
        entries: string[]
      }) {
    this.name = name
    this.level = level
    this.school = school
    this.classes = [...classes]
    this.components = [...components]
    this.castingTime = castingTime
    this.range = range
    this.duration = duration
    this.entries = [...entries]
  }

  static fromJSON(source: ISpell | any) {

    const schoolText: any = {
      'A': "Abjuration",
      'C': "Conjuration",
      'D': "Divination",
      'E': "Enchantment",
      'V': "Evocation",
      'I': "Illusion",
      'N': "Necromancy",
      'T': "Transmutation",
    }

    function durationText(d: ISpell | any) {
      let text = ""
      if (d.duration !== undefined) {
        const duration = d.duration[0]
        if (duration.type === "special") {
          text += "special"
        }
        if (duration.type === "instant") {
          text += "instant"
        }
        if (duration.type === "permanent") {
          if (duration.ends.length === 1) {
            text += "until dispelled"
          } else {
            text += "until dispelled or triggered"
          }
        }
        if (duration.type === "timed") {
          // if (duration.duration.upTo) {
          //   text += "up to"
          // }
          text += `up to ${duration.duration.amount} ${duration.duration.type}`
        }
        if (duration.concentration) {
          text = "Concentration, " + text
        }
      }
      return text
    }

    function rangeText(d: ISpell){
      let text = ""
      if (d.range &&  d.range.distance && d.range.type === "point" && d.range.distance.type === "self") {
        return "self"
      }
      if (d.range && d.range.distance) {
        text += `${d.range.distance.amount} ${d.range.distance.type}`
      }
      return text
    }

    let spell = new Spell(
      source["name"],
      {
        level: source["level"],
        school: schoolText[source["school"]],
        classes: source["classes"]["fromClassList"].map((c: any) => c["name"]).sort(),
        components: Object.keys(source["components"]),
        castingTime: `${source["time"][0]["number"]} ${source["time"][0]["unit"]}`,
        range: rangeText(source),
        duration: durationText(source),
        entries: [...source["entries"]]
      }
    )
    return spell
  }
}