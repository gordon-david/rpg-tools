import { SpellTable, TableColumn, useSpellDataService } from "feature/dndspells";
import { Layout } from "lib/components/Layout";
import { useState } from "react";

export function DndSpellsPage() {
    const spellService = useSpellDataService();
    const [checkboxes, setCheckboxes] = useState({});

    const handleHeaderClick = (header: TableColumn) => {
        spellService.toggleSorting()
    }

    const updateFilter = (type: 'school' | 'components'| 'classes', name: string, isChecked: boolean) => {
        
    }

    return (
        <Layout>
            <section>
                <fieldset>
                    <legend>Schools</legend>
                    <div>
                        <input type="checkbox"/>
                        <label htmlFor="abjuration">Abjuration</label>
                    </div>
                </fieldset>
            </section>
            <SpellTable spells={spellService.spells} headerClicked={handleHeaderClick} />
        </Layout>
    );
}
