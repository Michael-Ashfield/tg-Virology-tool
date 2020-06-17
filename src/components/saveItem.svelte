<script>
  import Delete from "./saveDelete.svelte";
  import Update from "./saveLoad.svelte";
  import { ButtonToolbar } from "sveltestrap";

  export let sItem;
</script>

<td>{sItem.value.name}</td>
<td>{sItem.value.totals.stealth}</td>
<td>{sItem.value.totals.resistance}</td>
<td>{sItem.value.totals.stage_speed}</td>
<td>{sItem.value.totals.transmission}</td>
<td>
  <ButtonToolbar>
    <div class="btn-group mr-2" role="group" aria-label="First group">
      <Update list={sItem.value.list} />
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Second group">
      <Delete id={sItem.id} />
    </div>
  </ButtonToolbar>
</td>
