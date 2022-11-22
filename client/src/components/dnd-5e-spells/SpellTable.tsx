import { useState, useContext, useEffect } from "react";
import SpellsContext from "./SpellsContext";
import Modal from "../common/Modal";
import SpellCard from "./SpellCard";

const columns = ["name", "level", "school", "classes", "components"];

/*

actions
- column header clicked
- spell row clicked
- filter checkbox selected/deselected

 */

type ColumnHeader = 'NAME' | 'LEVEL' | 'SCHOOL' | 'CLASSES' | 'COMPONENTS'

interface Props {
    // spells data object
    // TODO: make spell types
    data?: any;
    columnHeaderClicked: (columnHeader: ColumnHeader) => void;
    spellRowClicked: (rowID: number) => void;
}

export default function SpellTable({ props }: { props: Props }) {
    const spellsContext = useContext(SpellsContext);
    const defaultDisplayIndexes = () => [...Array(spellsContext.length).keys()];

    const [showModal, setShowModal] = useState(false);

    const [displayedIndexes, setDisplayedIndexes] = useState([]);
    const [sortBy, setSortBy] = useState({ column: "name", ascending: true });
    const [filters, setFilters] = useState(() => ({
        name: new Set(),
        level: new Set(),
        school: new Set(),
        classes: new Set(),
        components: new Set(),
    }));

    useEffect(() => {
        setDisplayedIndexes([...defaultDisplayIndexes()]);
    }, []);

    const modalHandler = (toShow, rowId) => {
        // if (rowId !== undefined) {
        //   setModalContent({
        //     title: spellsContext.getRow(rowId)["name"],
        //   });
        // }
        // setShowModal(toShow);
    };

    const handleHeaderClick = (column) => {
        let tempSortBy = { ...sortBy };
        let tempDisplayedIndexes = [...displayedIndexes];

        if (column === sortBy.column) {
            tempSortBy.ascending = !sortBy.ascending;
        }
        if (column !== sortBy.column) {
            tempSortBy.ascending = true;
            tempDisplayedIndexes.sort((a, b) => {
                let dataA = spellsContext.getRow(a)[column];
                let dataB = spellsContext.getRow(b)[column];
                if (dataA < dataB) {
                    return -1;
                }
                if (dataA > dataB) {
                    return 1;
                }
                return 0;
            });
        }

        tempSortBy.column = column;
        setDisplayedIndexes(tempDisplayedIndexes);
        setSortBy(tempSortBy);
    };

    const handleFilterSelection = (type, value) => {
        let temp = {
            name: new Set(filters.name),
            level: new Set(filters.level),
            school: new Set(filters.school),
            classes: new Set(filters.classes),
            components: new Set(filters.components),
        };

        if (temp[type].has(value)) {
            temp[type].delete(value);
        } else {
            temp[type].add(value);
        }

        setFilters({ ...temp });
    };

    const shouldExclude = (row) => {
        const filteredTypes = new Set();
        const rowIncludes = new Set();

        for (let t in filters) {
            if (filters[t].size === 0) continue;
            filteredTypes.add(t);
            const check = row[t].filter((x) => filters[t].has(x));
            if (check.length > 0) rowIncludes.add(t);
        }

        if (filteredTypes.size === 0) {
            return false;
        }

        if (
            new Set([...filteredTypes].filter((x) => rowIncludes.has(x))).size ===
            filteredTypes.size
        ) {
            return false;
        }

        return true;
    };

    const makeRow = (index) => {
        let row = spellsContext.getRow(index);

        if (shouldExclude(row)) {
            return;
        }

        return (
            <tr key={`spell-tr-${index}`}
                onClick={() => modalHandler(true, index)}
            >
                <td>{row["name"]}</td>
                <td>{row["level"]}</td>
                <td>{row["school"]}</td>
                <td>{row["classes"].join(", ")}</td>
                <td>{row["components"].join(", ")}</td>
            </tr>
        );
    };

    return (
        <div>
            <button onClick={() => setShowModal(!showModal)}>show/hide</button>
            <Modal show={showModal}> <p>some test</p></Modal>
            {/* {showModal ? (
        <SpellModal
          showModal={showModal}
          setShowModal={modalHandler}
          content={modalContent}
        />
      ) : (
        ""
      )} */}
            <section>
                <fieldset>
                    <legend>Schools</legend>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Abjuration")}
                        onChange={() => handleFilterSelection("school", "Abjuration")}
                    />{" "}
                    <label>Abjuration</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Conjuration")}
                        onChange={() => handleFilterSelection("school", "Conjuration")}
                    />{" "}
                    <label>Conjuration</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Divination")}
                        onChange={() => handleFilterSelection("school", "Divination")}
                    />{" "}
                    <label>Divination</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Enchantment")}
                        onChange={() => handleFilterSelection("school", "Enchantment")}
                    />{" "}
                    <label>Enchantment</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Evocation")}
                        onChange={() => handleFilterSelection("school", "Evocation")}
                    />{" "}
                    <label>Evocation</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Illusion")}
                        onChange={() => handleFilterSelection("school", "Illusion")}
                    />{" "}
                    <label>Illusion</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Necromancy")}
                        onChange={() => handleFilterSelection("school", "Necromancy")}
                    />{" "}
                    <label>Necromancy</label>
                    <input
                        type="checkbox"
                        checked={filters.school.has("Transmutation")}
                        onChange={() => handleFilterSelection("school", "Transmutation")}
                    />{" "}
                    <label>Transmutation</label>
                </fieldset>
                <fieldset>
                    <legend>Classes</legend>
                    {spellsContext.allClasses().map((c) => (
                        <>
                            <input
                                key={`spells-filter-class-${c}`}
                                type="checkbox"
                                checked={filters.classes.has(c)}
                                onChange={() => handleFilterSelection("classes", c)}
                            />
                            <label>{c}</label>
                        </>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Components</legend>
                    <input
                        type="checkbox"
                        checked={filters.components.has("v")}
                        onChange={() => handleFilterSelection("components", "v")}
                    />{" "}
                    <label>Verbal</label>
                    <input
                        type="checkbox"
                        checked={filters.components.has("s")}
                        onChange={() => handleFilterSelection("components", "s")}
                    />{" "}
                    <label>Somatic</label>
                    <input
                        type="checkbox"
                        checked={filters.components.has("m")}
                        onChange={() => handleFilterSelection("components", "m")}
                    />{" "}
                    <label>Material</label>
                </fieldset>
            </section>
            <table>
                <thead>
                    <tr>
                        {columns.map((e) => (
                            <th key={`spell-th-${e}`} onClick={() => handleHeaderClick(e)}>
                                {String(e).charAt(0).toUpperCase() + String(e).slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortBy.ascending
                        ? displayedIndexes.map((i) => makeRow(i))
                        : displayedIndexes
                            .slice()
                            .reverse()
                            .map((i) => makeRow(i))}
                </tbody>
            </table>
        </div>
    );
}
