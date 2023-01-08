<script lang="ts">
	import type { Spell, TableColumn } from '../types';
	import SpellTableRow from './SpellTableRow.svelte';

	export let data: Spell[];

	export let headerClicked: (header: TableColumn) => void;
</script>

<table>
	<tr>
		<th on:click={() => headerClicked('name')}>Name</th>
		<th on:click={() => headerClicked('school')}>School</th>
		<th on:click={() => headerClicked('class')}>Class</th>
		<th>Description</th>
	</tr>
	{#if data}
		{#each data as spell}
			<SpellTableRow {spell} />
		{/each}
	{/if}
</table>
