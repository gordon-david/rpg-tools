import { Layout } from "../components/Layout";
import { SpellTable } from "components/dnd-5e-spells/components/SpellTable"
import { useSpellDataService } from "components/dnd-5e-spells/hooks/useSpellsData";
import { TableColumn } from "components/dnd-5e-spells/Types";

export function DndSpellsPage() {
    const spellService = useSpellDataService();

    const handleHeaderClick = (header: TableColumn) => {
        spellService.toggleSorting(header)
    }

    return (
        <Layout>
            <section>
                <fieldset>
                    <legend>Schools</legend>
                    <input 
                    type="checkbox" 
                    />
                </fieldset>
            </section>
            <SpellTable spells={spellService.spells} headerClicked={handleHeaderClick}/>
        </Layout>
    );
}
