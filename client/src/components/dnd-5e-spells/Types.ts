export interface ClassListing {
    name: string,
    source: string
}

export type SchoolAbbreviation =
    'A'
    | 'C'
    | 'D'
    | 'E'
    | 'V'
    | 'I'
    | 'N'
    | 'T'

// Interface for raw json data
export interface SpellData {
    name: string,
    level: number,
    school: SchoolAbbreviation,
    entries: string[]
    classes: {
        fromClassList: ClassListing[],
        fromClassListVariant: ClassListing[]
    },
    backgrounds: ClassListing[]
}