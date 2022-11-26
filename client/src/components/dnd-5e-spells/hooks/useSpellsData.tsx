
import { createContext, useEffect, useState } from "react";
import { SpellData, DND5ESpellSchool, Spell, Filter, TableColumn } from '../Types'

const rawSpellData: SpellData = require("data/spells.json")

// export type Filter = { type: "school" | "class" | "components", values: string[] }
// export type TableColumn = "school" | "class" | "name" | "components"
export function useSpellDataService() {
    const [spells, setSpell] = useState<Spell[]>(rawSpellData.spells)

    const [sorting, setSorting] = useState<{ by: string, direction: string }>({ by: 'name', direction: 'ascending' })
    const [filters, setFilters] = useState<Filter[]>([])

    useEffect(() => { }, [filters])
    useEffect(() => {

        const output = [...spells].sort((prev: Spell, next: Spell) => {
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

            if (sorting.direction === 'ascending') {
                if (prevSortVal < nextSortVal)
                    return -1
                return 1
            }

            if (prevSortVal > nextSortVal)
                return -1
            return 1
        })
        setSpell(prev => output)
    }, [sorting])

    return {
        spells,
        filters,
        setFilters,
        schools: rawSpellData['schools'],
        classes: rawSpellData['classes'],
        backgrounds: rawSpellData['backgrounds'],
        toggleSorting(header: TableColumn) {
            if (header === sorting.by)
                setSorting(prev => ({ by: prev.by, direction: (prev.direction === 'ascending') ? 'descending' : 'ascending' }))
            else
                setSorting(prev => ({ by: header, direction: 'ascending' }))
        },
        update(
            { filters, sorting }
                : {
                    filters?: Filter[]
                    sorting?: { by: TableColumn, direction: "ascending" | "descending" }
                }
                = { sorting: { by: "name", direction: "ascending" } }
        ): void {
            if (!filters && !sorting)
                return

            const output: Spell[] = rawSpellData['spells'].map((spell: Spell) => {
                let include = false

                if (filters !== undefined) {

                    filters.forEach(filter => {
                        switch (filter.type) {
                            case "class":
                                spell.classes.fromClassList.forEach((spellClass: any) => filter.values.forEach(filterClass => {
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

            setSpell(prev => output)
        },
    }
}