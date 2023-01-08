import { derived, get, writable, type Readable, type Subscriber, type Writable } from "svelte/store"

import data from '$lib/json/spells.json'
import { readable } from "svelte/store"
import type { Filter, Sorting, Spell, SpellData, TableColumn } from "./types";

const initialData: any = {
    spells: [],
    filters: []
}

export interface SpellStore {
    spells: Readable<Spell[]>,
    schools: string[],
    classes: string[],
    backgrounds: string[],
    toggleSortDirection: (by?: TableColumn) => void,
    setFilters: (filters: Filter[]) => void,
    setSorting: (by: TableColumn) => void
}

type SpellWrapper = {
    index: number,
    spell: Spell,
    included: boolean
}

export function makeSpellStore(): SpellStore {

    const sorting: Sorting = { by: 'name', direction: 'ascending' }
    const spellWrapper: Writable<SpellWrapper[]> = writable((data as SpellData)['spells']
        .map((spell: Spell, index: number) => ({
            spell,
            index,
            included: true
        })))

    const spells: Readable<Spell[]> = derived(spellWrapper, (values: SpellWrapper[]) => values.reduce(
        (result: Spell[], element: SpellWrapper) => {
            if (element.included)
                result.push(element.spell)
            return result
        },
        []
    ))


    function applySorting() {
        spellWrapper.update((value: SpellWrapper[]) => {
            value.sort((prev: SpellWrapper, next: SpellWrapper) => {

                let prevSortVal = ''
                let nextSortVal = ''

                switch (sorting.by) {
                    case 'name':
                        prevSortVal = prev.spell.name
                        nextSortVal = next.spell.name
                        break
                    case 'school':
                        prevSortVal = prev.spell.school
                        nextSortVal = next.spell.school
                        break
                    default:
                        return 0
                }
                if (sorting.direction === 'ascending') {
                    return (prevSortVal < nextSortVal) ? -1 : 1
                }
                return (prevSortVal > nextSortVal) ? -1 : 1
            })

            console.log([value[0].spell.school]);
            return value
        })
    }


    return {
        classes: data.classes,
        schools: data.schools,
        backgrounds: data.backgrounds,
        spells: { subscribe: spells.subscribe },
        toggleSortDirection(by?: TableColumn) {
        },
        setFilters(filters: Filter[]) {
            console.log(filters);
            if (filters.length > 0) {

                spellWrapper.update((spellWrapper: SpellWrapper[]) =>
                    spellWrapper.map((spellWrapper) => {
                        let include = false
                        let filterIndex = 0

                        while (!include && filterIndex < filters.length) {
                            const currentFilter = filters[filterIndex]

                            switch (filters[filterIndex].type) {
                                case 'school':
                                    // avoiding assignment on short circuit
                                    if (currentFilter.value.toLowerCase() === spellWrapper.spell.school.toLowerCase()) {
                                        console.log(spellWrapper.spell.school);
                                        include = true
                                    }
                                    break
                                case "class":
                                    spellWrapper.spell.classes.fromClassList.forEach(
                                        classElement => {
                                            if (classElement.name.toLowerCase() === currentFilter.value.toLowerCase()){
                                                include = true
                                            }

                                        }
                                    )
                                    if (spellWrapper.spell.classes.fromClassListVariant !== undefined) {
                                        spellWrapper.spell.classes.fromClassListVariant.forEach(
                                            classElement => {
                                                if (classElement.name.toLowerCase() === currentFilter.value.toLowerCase())
                                                    include = true
                                            }
                                        )
                                    }
                            }

                            if (include)
                                break

                            filterIndex += 1
                        }

                        spellWrapper.included = include
                        return spellWrapper
                    })
                )
                return
            }
            spellWrapper.update(spellWrapper => spellWrapper.map(sw => {
                sw.included = true
                return sw
            }))
        },
        setSorting(by: TableColumn) {
            if (sorting.by === by) {
                if (sorting.direction === 'ascending') {
                    sorting.direction = 'descending'
                } else {
                    sorting.direction = 'ascending'
                }
            } else {
                console.log('here');

                sorting.by = by
                sorting.direction = 'ascending'
            }

            applySorting()
        }
    }
}