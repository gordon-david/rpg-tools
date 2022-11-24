import { Spell } from "../Types"

export type Header = "Name"

export const SpellTable = (props: { spells: Spell[], headerClicked(header: Header): void }) => {
    const handleHeaderClick = (header: Header) => {
        props.headerClicked(header)
    }
    return (
        <>
        <button onClick={() => props.headerClicked('Name')}>click</button>
            {props.spells.map(spell => <div>{spell.name}</div>)}
            <table>
                <thead>
                    <tr>
                        <th key={`spell-th-name`} onClick={() => handleHeaderClick('Name')}>Name</th>
                    </tr>
                </thead>
            </table>
        </>
    )
}