<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";

  let openModal = true;

  function closeModal() {
    openModal = false;
  }
</script>

<style>
  p {
    margin: 2rem;
    font-family: "Helvetica", sans-serif;
  }
  div {
    padding: 1.3rem;
  }
</style>

{#if openModal}
  <Modal on:cancel={closeModal}>
    <div slot="presentation">
      <p>
        Este sitio fue creado para la critica de poesía y derivados. Ante la
        cuarentena y la falta de transparencia en los talleres literarios,
        formamos una plataforma para depositar poemas u otres que serán
        criticados anónimamente. Los poemas pueden llevar autor, homónimo,
        pseudonimo o nada pero ten en cuenta que se puede filtrar por autor y ,
        así, buscar poemas específicos. Los poemas se disponen del más nuevo al
        más viejo, al final de ellos puedes hacer una o infinitas críticas
        anónimas. Al agregar un poema, tienes una vista previa para que no se
        corten los versos. Solicitamos honestidad y profundidad en las
        devoluciones, como una puñalada.
      </p>
      <Button action="Cerrar" on:openModal={closeModal} />
    </div>

  </Modal>
{/if}
