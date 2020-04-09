<script>
  import Button from "./Button.svelte";
  
  let atr;
  let autores;
  let poemas;
  let isLoading = false;
  let modal = false;
  function showModal() {
    modal = true;
  }

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
        return fetch("https://poemario-407fa.firebaseio.com/poems.json");
      })
      .then(resp => {
        {
          if (!resp.ok) {
            throw new Error("failed");
          }
          return resp.json();
        }
      })
      .then(data => {
        autores = Object.values(data);
        console.log(autores);
        atr = autores.map(cadaAutor => cadaAutor.autor);
      })
      .then(() => {
        let unique = [...new Set(atr)];
        console.log(unique);
        // poemas = Object.values(data);
        autoresStore.setAutores(unique);
      })
      .catch(err => {
        console.log(err);
      });
  }


</script>

<style>

</style>

<Button on:openModal={showModal} action="Agregar Poema" />
<div id="p5"></div>