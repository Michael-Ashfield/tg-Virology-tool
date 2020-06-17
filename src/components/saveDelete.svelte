<script>
  import { Button } from "sveltestrap";
  import { v_saves } from "../stores.js";
  import makeRequest from "./indexeddb.js";

  export let id;

  function deleteItem() {
    makeRequest({ operation: "delete", payload: { id: id } });
    v_saves.set(false);
  }
</script>

<Button on:click={deleteItem} color="danger">Delete</Button>
