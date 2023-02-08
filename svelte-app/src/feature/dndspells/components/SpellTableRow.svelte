<script lang="ts">
	import type { Spell } from '../types';
    import SpellDescriptionModal from './SpellDescriptionModal.svelte';

	export let spell: Spell;
    let isOpenModal = false;

	function shortDescription(text: string[]) {
		let shortText = '';
		let textIndex = 0;
		let textElementIndex = 0;

		while (shortText.length < 100) {
			if (textIndex >= text.length) {
				break;
			}

			shortText += text[textIndex][textElementIndex];
			textElementIndex += 1;

			if (textElementIndex >= text[textIndex].length) {
				textIndex += 1;
				textElementIndex = 0;
			}
		}
		shortText += '...';
		return shortText;
	}
</script>

<SpellDescriptionModal {isOpenModal} on:closeModal={() => isOpenModal = false} {spell}/>
<tr on:click={() => isOpenModal? isOpenModal = false : isOpenModal = true}>
	<td>{spell.name}</td>
	<td>{spell.school}</td>
    <td>{spell.classes.classesText}</td>
	<td>{shortDescription(spell.entries)}</td>
</tr>