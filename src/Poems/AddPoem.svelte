<script>
  import Modal from "../UI/Modal.svelte";
  import Button from "../UI/Button.svelte";
  import poemsStore from "./poems-store.js";
  import { createEventDispatcher } from "svelte";
  import { isEmpty } from "../helpers/validation.js";
  import TextInput from "../UI/TextInput.svelte";

  const dispatch = createEventDispatcher();

  export let titulo = "";
  let tituloValido = false;
  export let autor = "";
  let autorValido = false;
  export let cuerpo = "";
  let cuerpoValido = false;
  export let fecha = "";
  let fechaValida = false;
  $: cuerpo;
  $: tituloValido = !isEmpty(titulo);
  $: autorValido = !isEmpty(autor);
  $: fechaValida = !isEmpty(fecha);
  $: cuerpoValido = !isEmpty(cuerpo);
  $: formIsValid = tituloValido && autorValido && fechaValida && cuerpoValido;

  // $: titulovalido = !isEmpty(titulo);
  // $:console.log(titulovalido)
  function cancel() {
    dispatch("cancel");
  }
  let validityMessage = "";
  let valid = true;
  let touched = false;

  function isTouched() {
    touched = true;
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
</style>

<!-- <div class="shadow-lg sm:flex">
  <div
    class="sm:w-2/5 w-full bg-grey-light bg-cover bg-center text-white"
    style="background-image: url('')">
    <div class="p-8">
      <h1>
        Sube un
        <span class="text-indigo-light">poema</span>
      </h1>
    </div>
  </div> -->

<Modal on:cancel>
  <div class="sm:w-3/5 w-full bg-white" slot="x">
    <div class="p-8">
      <form>
        <TextInput
          id="titulo"
          label="titulo"
          class="bg-transparent border-b m-auto block border-grey w-full mb-6
          text-grey-darker pb-1"
          value={titulo}
          placeholder=""
          valid={tituloValido}
          validityMessage={'Ingrese un título válido.'}
          on:blur={isTouched}
          on:input={event => (titulo = event.target.value)} />

        <TextInput
          id="autor"
          label="Autor"
          class="bg-transparent border-b m-auto block border-grey w-full mb-6
          text-grey-darker pb-1"
          value={autor}
          placeholder=""
          valid={autorValido}
          validityMessage="Ingresa un autor válido."
          on:input={event => (autor = event.target.value)} />
        <TextInput
          id="fecha"
          valid={fechaValida}
          label="Fecha de publicación"
          class="bg-transparent border-b m-auto block border-grey w-full mb-6
          text-grey-darker pb-1"
          type="date"
          value={fecha}
          placeholder=""
          validityMessage="Ingresa un autor válido."
          on:input={event => (fecha = event.target.value)} />
        <TextInput
          label="Cuerpo"
          controlType="textarea"
          id="cuerpo"
          class="bg-transparent border-b m-auto block border-grey w-full mb-6
          text-grey-darker pb-1"
          rows="20"
          value={cuerpo}
          placeholder=""
          valid={cuerpoValido}
          validityMessage="Ingresa un autor válido."
          on:input={event => (cuerpo = event.target.value)}
          contenteditable="true"
          bind:innerHTML={cuerpo} />
          <p style="font-family: Helvetica">Esta es una previa de tu POEMA,<br>no queremos que nos corten los versos/besos:<br></p>
        <p style="white-space: pre; font-family: Helvetica;
    font-style: normal;">{cuerpo}</p>
        <button
          class="shadow-lg pt-3 pb-3 w-full text-gray bg-indigo
          hover:bg-indigo-light rounded-full cursor-pointer "
          type="button"
          on:click|preventDefault={() => dispatch('sendAndCloseModal')}
          disabled={!formIsValid}>
          Crear
        </button>
        <!-- <Button type="button" on:click={cancel}>Cancel</Button> -->
        {#if validityMessage && !tituloValido && touched}
          <p class="error-message">{validityMessage}</p>
        {/if}

      </form>
    </div>
  </div>

  <!-- </div> -->
</Modal>
