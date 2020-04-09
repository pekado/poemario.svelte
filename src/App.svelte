<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import Button from "./UI/Button.svelte";
  import Card from "./UI/Card.svelte";
  import Presentation from "./UI/Presentation.svelte";
  import Sidenav from "./UI/Sidenav.svelte";
  import PoemGrid from "./Poems/PoemGrid.svelte";
  import Modal from "./UI/Modal.svelte";
  import AddPoem from "./Poems/AddPoem.svelte";
  import poemsStore from "./Poems/poems-store.js";
  import { onMount } from "svelte";
  import autoresStore from "./Poems/autores-store.js";


  let atr;
  let autores;
  let poemas;
  let isLoading = false;
  let titulo = "";
  let autor = "";
  let fecha = "";
  let cuerpo = "";
  let comentario = [];
  $: poemInput = {
    titulo: titulo,
    autor: autor,
    fecha: fecha,
    cuerpo: cuerpo,
    id: Math.random(),
    comentario: comentario
  };

  let modal = false;
  function showModal() {
    modal = true;
  }

  onMount(() => {
    isLoading = true;
    fetch("https://poemario-407fa.firebaseio.com/poems.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(data => {
        isLoading = false;

        // poemas = Object.values(data);
        poemsStore.setPoemas(Object.values(data));
      })
      .catch();
  });

  function createPoem() {
    // poemas = [...poemsStore, poemInput];
    poemsStore.addPoem(poemInput);
    isLoading = true;
    fetch("https://poemario-407fa.firebaseio.com/poems.json", {
      method: "POST",
      body: JSON.stringify(poemInput),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        isLoading = false;
        modal = false;
        if (!res.ok) {
          throw new Error("Falló");
        }
        autoresStore.actAutores(poemInput.autor);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function filterByAuthor(event) {
    let autorId = event.explicitOriginalTarget.id;

    fetch("https://poemario-407fa.firebaseio.com/poems.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(data => {
        let filteredAuthor = Object.values(data).filter(function(aut) {
          return aut.autor == autorId;
        });
        console.log(filteredAuthor);
        poemsStore.setPoemas(filteredAuthor);
      });
  }
</script>

<style>
  h1 {
    @apply bg-black text-white;
  }

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }

  .flexcontainer {
    display: flex;
  }
  #app {
    float: left;
    margin: 10px 10px 0 0;
    width: 100%;
    z-index: 1000;
  }
  #app canvas {
    width: 100% !important;
    height: auto !important;
  }
  #agregar{
    margin: 2rem;
  }
</style>
<Presentation/>
<div id="app" />
<div id="agregar">
  <Button on:openModal={showModal} action="Agregar Poema" />
</div>
{#if modal && !isLoading}
  <AddPoem
    on:sendAndCloseModal={createPoem}
    on:cancel={() => (modal = false)}
    bind:autor
    bind:titulo
    bind:fecha
    bind:cuerpo />
{:else if modal && isLoading}
  <p>Loading...</p>
{/if}

<div class="flexcontainer">
  <div class="flex">
    <Sidenav on:filter={filterByAuthor} />
  </div>
  <div class="flex">
    <PoemGrid />
  </div>
</div>
