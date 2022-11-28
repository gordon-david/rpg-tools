<script lang="ts">
	import {
		makeSpellStore,
		type SpellStore
	} from '$feature/dndspells';
	import SpellTable from '$feature/dndspells/components/SpellTable.svelte';
	import SpellTableFilter from '$feature/dndspells/components/SpellTableFilter.svelte';

	const spellStore: SpellStore = makeSpellStore();
	const spells = spellStore.spells;
</script>

<svelte:head>
	<title>D&D 5E Spells</title>
	<meta name="description" content="A filterable, searchable table of D&D 5E spells." />
</svelte:head>

<section>
	<SpellTableFilter
		schools={spellStore.schools}
		classes={spellStore.classes}
		handleFilters={spellStore.setFilters}
	/>
	<SpellTable data={$spells} headerClicked={spellStore.setSorting} />
</section>
