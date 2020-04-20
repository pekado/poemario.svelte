<script>
  import poemsStore from "./poems-store.js";
  import Poems from "./Poems.svelte";
  import { flip } from "svelte/animate";
  import { fade, fly, slide, scale } from "svelte/transition";
  import Sidenav from "../UI/Sidenav.svelte";
  import { get } from "svelte/store";

  let oneAuthor = false;
  // $: onlyOneAuthor = oneAuthor ? poemsStore.filter(a => a.autor) : poemsStore;
  
  
</script>

<style>
  div {
    background: #e7c75e;
    justify-content: space-between;
  }
</style>


{#each $poemsStore as pm(pm.id)}
  <div class="flex" transition:fade={{ delay: 500 }} animate:flip>
    <Poems {...pm} />
  </div>
{/each}
