<script>
  import { Button } from "sveltestrap";

  import { v_list } from "../stores.js";
  import Chart from "./chart.svelte";

  let v_curr;
  export let list;

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  function updateItem() {
      v_list.set(list)
  }
</script>

<Button on:click={updateItem} color="primary">Load</Button>
