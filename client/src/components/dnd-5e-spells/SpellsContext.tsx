import { createContext } from "react";
import { SpellData, DND5ESpellSchool, Spell } from './Types'


const rawSpellData: SpellData = require("../../data/output.json")


let spellData: { row: any, classText: any, allSpells: any, allClasses: any } = {
    row: {},
    classText: {},
    allSpells: [],
    allClasses: [],
};

// caches associative arrays that links to raw data
const spellCache = (() => {

    return {}
})()


type SortBy = "name" | "school" | "class" | "components"
type SortDirection = "ascending" | "descending"

const value = {
    // get component text
    getAll(): Spell[] {
        return rawSpellData['spells'];
    },
    get(
        { filters, sorting }
            : {
                filters?: { type: "school" | "class" | "components", values: string[] }[],
                sorting?: { by: "name" | "school" | "class" | "components", direction: "ascending" | "descending" }
            }
            = { sorting: { by: "name", direction: "ascending" } }
    ): Spell[] | [] {
        const output: Spell[] = rawSpellData['spells'].map((spell: Spell) => {
            let include = false

            if (filters !== undefined) {

                filters.forEach(filter => {
                    switch (filter.type) {
                        case "class":
                            spell.classes.fromClassList.forEach(spellClass => filter.values.forEach(filterClass => {
                                if (spellClass.name === filterClass)
                                    include = true
                            }))
                            break
                        case "components":
                            break
                        case "school":
                            break
                        default:
                            break
                    }
                })

                if (include) {
                    return spell
                }
            }

            return spell

        })

        if (sorting)
            output.sort((prev: Spell, next: Spell) => {
                let prevSortVal = ''
                let nextSortVal = ''

                switch (sorting.by) {
                    case "name":
                        prevSortVal = prev.name
                        nextSortVal = next.name
                        break
                    case "school":
                        prevSortVal = prev.school
                        nextSortVal = next.school
                        break
                    case "class":
                        prevSortVal = prev.classes.classesText
                        nextSortVal = next.classes.classesText
                        break
                    case "components":
                        prevSortVal = (prev.components.m) ? prevSortVal + "m" : prevSortVal
                        prevSortVal = (prev.components.s) ? prevSortVal + "s" : prevSortVal
                        prevSortVal = (prev.components.v) ? prevSortVal + "v" : prevSortVal

                        nextSortVal = (next.components.m) ? nextSortVal + "m" : nextSortVal
                        nextSortVal = (next.components.s) ? nextSortVal + "s" : nextSortVal
                        nextSortVal = (next.components.v) ? nextSortVal + "v" : nextSortVal
                        break
                    default:
                        return 0
                }

                if (prevSortVal < nextSortVal && sorting.direction === "ascending")
                    return -1
                if (prevSortVal > nextSortVal && sorting.direction === "ascending")
                    return 1
                if (prevSortVal < nextSortVal && sorting.direction === "descending")
                    return 1
                //if (prevSortVal > nextSortVal && sorting?.direction === "descending")
                return -1
            })

        return output
    },
    getSpellByID(id: number): Spell {
        return rawSpellData['spells'][id];
    },
    numberOfSpells: rawSpellData['spells'].length,
    allSchools(): string[] {
        return rawSpellData['schools']
    },
    allClasses(): string[] {
        return rawSpellData['classes'];
    },
};

const SpellsContext = createContext(value);

const Consumer = SpellsContext.Consumer;

export default SpellsContext;
export { Consumer, value };
