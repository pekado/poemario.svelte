<script>
  import { createEventDispatcher } from "svelte";
 
  let dispatch = createEventDispatcher();

  export let action;
 </script>

<style>
  .btn-blue {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded ;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }

  @font-face {
  font-family: Gosha Sans;
  src: url(./fonts/MonumentExtended-Regular.otf);
}
  button{
     border-bottom: 1px solid black;
     width: 30%;
     background-color: rgba(231, 64, 64, 0);
     min-width: 100px;
     font-family: 'Monument', sans-serif;
  }
</style>

<button class="hadow-lg pt-3 pb-3 w-full text-gray bg-red-500
          hover:bg-pink rounded-full cursor-pointer " on:click={() => dispatch("openModal")}>
  {action}
</button>
