// Interface for raw json data

export type DND5ESpellSchool = "Abjuration"
    | "Conjuration"
    | "Divination"
    | "Enchantment"
    | "Evocation"
    | "Illusion"
    | "Necromancy"
    | "Transmutation"

export interface Spell {
    name: string,
    level: number,
    school: DND5ESpellSchool

    // spell descriptions as a list of paragraphs
    entries: string[]
    classes: {
        fromClassList: {
            name: string,
            source: string
        }[],
        fromClassListVariant?: {
            name: string,
            source: string
        }[],

        // display text of classes that have access to this spell
        classesText: string,
    },
    backgrounds: {
        name: string,
        source: string
    },
    components: {
        v?: boolean,
        s?: boolean,
        m?: boolean,
    },
}

type DND5EClass = "Paladin"
    | "Ranger"
    | "Sorcerer"
    | "Warlock"
    | "Wizard"
    | "Druid"
    | "Bard"
    | "Cleric"
    | "Artificer (Revisited)"
    | "Artificer"
    | "Monk"

export interface SpellData {
    spells: Spell[],
    classes: DND5EClass[],
    backgrounds: string[],
    schools: DND5ESpellSchool[]
}

export type Filter = { type: "school" | "class" | "components", values: string[] }
export type TableColumn = "school" | "class" | "name" | "components"