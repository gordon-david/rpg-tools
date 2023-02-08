<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Spell } from "../types";


    export let isOpenModal: boolean;
    export let spell: Spell;
    const dispatch = createEventDispatcher();

    function closeModal(){
        console.log('test');
        dispatch('closeModal', {isOpenModal})
        
        isOpenModal = false
    }
</script>

<div id="background" style="display: {isOpenModal ? 'block' : 'none'};"></div>
<div id="modal" style="display: {isOpenModal ? 'block' : 'none'};">
    <button on:click={closeModal}>close</button>
    {spell.entries}
</div>

<style>
    #background {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    #modal {
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
    }
</style>