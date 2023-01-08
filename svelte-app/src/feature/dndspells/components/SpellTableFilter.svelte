<script lang="ts">
	import type { Filter, FilterTypes } from '../types';

	export let schools: string[];
	export let classes: string[];

	export let handleFilters: (filters: Filter[]) => void;

	const filters: { [index: string]: boolean } = {};

	$: {
		let _filters: Filter[] = [];
		Object.keys(filters).forEach((filterKey) => {
			if (filters[filterKey]) {
				const [type, value] = filterKey.split('-') as [FilterTypes, string];
				_filters.push({ type, value });
			}
		});

		handleFilters(_filters);
	}
</script>

<form style="display: flex; flex-direction: row;">
	<fieldset>
		<legend>Schools</legend>
		{#each schools as school}
			<div>
				<label for={`checkbox-${school}`}>{school}</label>
				<input
					type="checkbox"
					id={`checkbox-${school}`}
					bind:checked={filters[`school-${school}`]}
				/>
			</div>
		{/each}
	</fieldset>
	<fieldset>
		<legend>Class</legend>
		{#each classes as characterClass}
			<div>
				<label for={characterClass}>{characterClass}</label>
				<input
					type="checkbox"
					name={characterClass}
					id={`${characterClass}-checkbox`}
					bind:checked={filters[`class-${characterClass}`]}
				/>
			</div>
		{/each}
	</fieldset>
</form>
