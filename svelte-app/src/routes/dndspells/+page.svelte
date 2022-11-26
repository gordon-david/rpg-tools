<script lang="ts">
	import data from '$lib/json/spells.json';
	import { writable, type Writable } from 'svelte/store';

	type DND5ESpellSchool =
		| 'Abjuration'
		| 'Conjuration'
		| 'Divination'
		| 'Enchantment'
		| 'Evocation'
		| 'Illusion'
		| 'Necromancy'
		| 'Transmutation';

	interface Spell {
		name: string;
		level: number;
		school: DND5ESpellSchool;

		// spell descriptions as a list of paragraphs
		entries: string[];
		classes: {
			fromClassList: {
				name: string;
				source: string;
			}[];
			fromClassListVariant?: {
				name: string;
				source: string;
			}[];

			// display text of classes that have access to this spell
			classesText: string;
		};
		backgrounds?: {
			name: string;
			source: string;
		};
		components: {
			v?: boolean;
			s?: boolean;
			m?: boolean;
		};
	}

	type DND5EClass =
		| 'Paladin'
		| 'Ranger'
		| 'Sorcerer'
		| 'Warlock'
		| 'Wizard'
		| 'Druid'
		| 'Bard'
		| 'Cleric'
		| 'Artificer (Revisited)'
		| 'Artificer'
		| 'Monk';

	interface SpellData {
		spells: Spell[];
		classes: DND5EClass[];
		backgrounds: string[];
		schools: DND5ESpellSchool[];
	}

	type Filter = { type: 'school' | 'class' | 'components'; values: string[] };
	type TableColumn = 'school' | 'class' | 'name' | 'components';
	type Sorting = { by: TableColumn; direction: 'ascending' | 'descending' };

	// let sorting = { by: 'name', direction: 'ascending' };

	const spellData = (function (data: SpellData) {
		let $spells: Writable<Spell[]> = writable([...data.spells] as Spell[])
		let $filters: Filter[] = [];

		let sorting: Sorting = { by: 'name', direction: 'ascending' };

		return {
			spellsSubscribe: $spells.subscribe,
			$filters,
			toggleSorting(column: TableColumn) {
				if (column === sorting.by)
					sorting = {
						by: sorting.by,
						direction: sorting.direction === 'ascending' ? 'descending' : 'ascending'
					};
				else sorting = { by: column, direction: 'ascending' };

				const output = ([...data.spells] as Spell[]).sort((prev: Spell, next: Spell) => {
					let prevSortVal = '';
					let nextSortVal = '';

					switch (sorting.by) {
						case 'name':
							prevSortVal = prev.name;
							nextSortVal = next.name;
							break;
						case 'school':
							prevSortVal = prev.school;
							nextSortVal = next.school;
							break;
						case 'class':
							prevSortVal = prev.classes.classesText;
							nextSortVal = next.classes.classesText;
							break;
						case 'components':
							prevSortVal = prev.components.m ? prevSortVal + 'm' : prevSortVal;
							prevSortVal = prev.components.s ? prevSortVal + 's' : prevSortVal;
							prevSortVal = prev.components.v ? prevSortVal + 'v' : prevSortVal;

							nextSortVal = next.components.m ? nextSortVal + 'm' : nextSortVal;
							nextSortVal = next.components.s ? nextSortVal + 's' : nextSortVal;
							nextSortVal = next.components.v ? nextSortVal + 'v' : nextSortVal;
							break;
						default:
							return 0;
					}

					if (sorting.direction === 'ascending') {
						if (prevSortVal < nextSortVal) return -1;
						return 1;
					}

					if (prevSortVal > nextSortVal) return -1;
					return 1;
				});
				$spells = output;
				console.log('spells', $spells);
			}
		};
	})(data as SpellData);

	spells = spellData.$spells;
	filters = spellData.$filters;
</script>

<svelte:head>
	<title>D&D 5E Spells</title>
	<meta name="description" content="A filterable, searchable table of D&D 5E spells." />
</svelte:head>

<section>
	<button on:click={() => spellData.toggleSorting('name')}>toggle sorting</button>
	{#each spells as spell}
		<p>{spell.name}</p>
	{/each}
</section>
