import { Layout } from "../components/Layout";
// import {SpellTable} from '@/components/dnd-5e-spells/components/SpellTable'
import { SpellTable } from "components/dnd-5e-spells/components/SpellTable"
import { useSpellDataService } from "components/dnd-5e-spells/hooks/useSpellsData";
export function DndSpellsPage() {
    const spellService = useSpellDataService();

    const handleHeaderClick = (header: string) => {
        spellService.toggleSorting(header)
    }

    return (
        <Layout>
            <SpellTable spells={spellService.spells} headerClicked={handleHeaderClick}/>
        </Layout>
    );
}
