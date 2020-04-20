<script>
  import poemsStore from "./poems-store.js";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, fly, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import commentStore from "./comments-store.js";
  import { isEmpty } from "../helpers/validation.js";

  export let titulo;
  export let fecha;
  export let autor;
  export let cuerpo;
  let comment = "";
  let commentIsValid = false;
  let x;
  $: commentInput = {
    comment: comment,
    titulo: titulo
  };
  let hiddenPoem = true;
  let dispatch = createEventDispatcher();
  function getCuerpo() {
    const unsubscribe = poemsStore.subscribe(pms => {
      cuerpo = pms.find(p => p.titulo === titulo).cuerpo;
    });
    unsubscribe();
    fetch("https://poemario-407fa.firebaseio.com/comments.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(data => {if (data === null) {
        hiddenPoem = false;
        x = false;
      } else {
        let filteredComments = Object.values(data);
        console.log(filteredComments);
        x = filteredComments.filter(c => c.titulo === titulo);
      }
        
        // .filter(function(aut) {
        //   return aut. == cuerpo;
      })
      .then(() => {
        console.log(x);
        commentStore.setComments(x);
         hiddenPoem = false;
      });
  }
  function sendComment() {
    if (isEmpty(comment)) {
      !commentIsValid
    } else {
      fetch("https://poemario-407fa.firebaseio.com/comments.json", {
      method: "POST",
      body: JSON.stringify(commentInput),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error("Falló");
      }
      commentStore.updateComments(commentInput);
    });
  }
    }
    
</script>

<style>
 .invalid {
    border-color: red;
    background-color: rgb(245, 206, 206);
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
  .monument{
    font-family: "Monument"
  }
  hr{
    margin: 1.5rem 0;
  }
  #item {
    margin: 3rem;
  }
  #item {
    width: 100wh;
    height: 100%;
    background: linear-gradient(-90deg, #f1d1d1, #fad4d4, #f8f7c3, #e9fac3);
    background-size: 400% 3000%;
    -webkit-animation: Gradient 10s ease infinite;
    -moz-animation: Gradient 10s ease infinite;
    animation: Gradient 10s ease infinite;
    font-family: "Didact Gothic", sans-serif;
  }

  @-webkit-keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @-moz-keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
  #poem {
    margin: 2rem;
  }
</style>

<div id="item" class="bg-white shadow p-3 rounded lg:w-64">
  <div>
    <div
      style="background-image: url('')"
      class="bg-cover bg-center bg-grey-lighter h-32 rounded" />
  </div>
  <div class="mt-6">
    <p class="text-lg text-bold tracking-wide text-grey-dark mb-2">{titulo}</p>
    <p class="text-sm text-grey-dark font-hairline">{autor}, {fecha}</p>
  </div>
  {#if !hiddenPoem}
    <Modal on:cancel={() => (hiddenPoem = true)}>
      <div slot="poem" id="poem" transition:fade={{ delay: 300 }}>
      <h3 class="monument">{titulo}</h3>
      <br>
        <p
          style="white-space: pre-line;"
          class="text-sm text-grey-dark font-hairline"
          id="reform">
          {cuerpo}
        </p>
        <hr>
  <h3 class="monument">Críticas, devoluciones, comentarios.</h3>
  <hr>
    {#if x}
        {#each $commentStore as comment, i}
          <div>
            <p>{comment.comment}</p>
          </div>
          <hr>
        {/each}
        {/if}
        <TextInput
          id="comentario"
          label="Devolución, crítica, puñalada"
          class="bg-transparent border-b m-auto block border-grey w-full mb-6
          text-grey-darker pb-1"
          value={comment}
          on:input={event => (comment = event.target.value)}
          placeholder="Sueltese" />
        <Button action="Herir" on:openModal={sendComment}  disabled={!commentIsValid}></Button> 
        <Button on:openModal={() => (hiddenPoem = true)} action="Cerrar" />
      </div>

    </Modal>
  {/if}
  <div class="mt-6">
    <Button action="Revisar" on:openModal={getCuerpo} />

  </div>
</div>
