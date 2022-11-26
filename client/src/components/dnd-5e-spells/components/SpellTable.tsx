import { Spell, TableColumn } from "../Types"

export const SpellTable = (props: { spells: Spell[], headerClicked(header: TableColumn): void }) => {
    const handleHeaderClick = (header: TableColumn) => {
        props.headerClicked(header)
    }
    return (
        <>
        <button onClick={() => props.headerClicked('name')}>click</button>
            {props.spells.map(spell => <div>{spell.name}</div>)}
            <table>
                <thead>
                    <tr>
                        <th key={`spell-th-name`} onClick={() => handleHeaderClick('name')}>Name</th>
                    </tr>
                </thead>
            </table>
        </>
    )
}