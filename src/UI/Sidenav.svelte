<script>
  import autoresStore from "../Poems/autores-store.js";
  import poemsStore from "../Poems/poems-store.js";
  import { onDestroy } from "svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { createEventDispatcher } from "svelte";

  

  let dispatch = createEventDispatcher();
  let autores = [];
  let cadaAutor;
  let atr;
  let nombres;
  export let autorSearched;
  let unique;

  dispatch(() => {
   autorSearched = event.target.id;
    }
  )
  $: onMount(() => {
    fetch("https://poemario-407fa.firebaseio.com/poems.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(data => {
        autores = Object.values(data);
        atr = autores.map(cadaAutor => cadaAutor.autor);
      })
      .then(() => {
        unique = [...new Set(atr)];
        autoresStore.setAutores(unique);
      })
      .catch();
  });


</script> 
<style>
  div{
    width:100%;
    margin: auto 1rem;
    
  }
  h4{
    cursor: progress;
    font-size: 20px;
  }
</style>
<div> 
<h3>Autores (?):</h3>
    {#each $autoresStore as autor}
      <h4  id="{autor}" on:click={() => dispatch('filter', 1)} bind:this={autorSearched}>{autor}</h4>
    {/each}
</div>
