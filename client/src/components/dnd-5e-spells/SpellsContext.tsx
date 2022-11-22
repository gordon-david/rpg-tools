import { createContext } from "react";
import { SchoolAbbreviation, SpellData } from './Types'


export type Spell = SpellData & { schoolText: string }

const _data: Spell[] = require("../../data/spells.json")["spell"].sort((a: SpellData, b: SpellData) => {
    if (a["name"] < b["name"]) {
        return -1;
    }
    if (a["name"] > b["name"]) {
        return 1;
    }
    return 0;
});

let dataCache = {
    row: {},
    classText: {},
    allSpells: [],
    allClasses: [],
};

const schoolText = (rawSchool: SchoolAbbreviation) => {
    const schools = {
        A: "Abjuration",
        C: "Conjuration",
        D: "Divination",
        E: "Enchantment",
        V: "Evocation",
        I: "Illusion",
        N: "Necromancy",
        T: "Transmutation",
    };
    return schools[rawSchool];
};

function collectClasses() {
    const classSet = new Set();

    _data.forEach((r) => {
        r["classes"]["fromClassList"]
            .map((e) => e.name)
            .forEach((c) => classSet.add(c));
    });

    dataCache.allClasses = [...classSet].sort();
}

const value = {
    // get class text
    classText(rowId) {
        if ("classText" in dataCache && "rowId" in dataCache) {
            return dataCache["classText"][rowId];
        }

        const text = _data[rowId]["classes"]["fromClassList"]
            .map((e) => e.name)
            .sort()
            .join(", ");
        dataCache["classText"][rowId] = text;

        return text;
    },
    // get component text
    getAll() {
        return _data;
    },
    getRow(rowId) {
        if ("row" in dataCache && "rowId" in dataCache["row"]) {
            return dataCache["row"][rowId];
        }
        const row = _data[rowId];
        dataCache["row"][rowId] = {
            name: [row["name"]],
            level: [row["level"]],
            classes: [
                ...new Set(row["classes"]["fromClassList"].map((e) => e["name"])),
            ].sort(),
            components: Object.keys(row["components"]).sort().reverse(),
            school: [schoolText(row["school"])],
        };
        return dataCache.row[rowId];
    },
    length: _data.length,
    allSchools() {
        if (dataCache.allSpells.length > 0) {
            return dataCache.allSpells;
        }
        return [];
    },
    allClasses() {
        if (dataCache.allClasses.length > 0) {
            return dataCache.allClasses;
        }
        collectClasses();
        return dataCache.allClasses;
    },
};

const SpellsContext = createContext(value);

const Consumer = SpellsContext.Consumer;

export default SpellsContext;
export { Consumer, value };
