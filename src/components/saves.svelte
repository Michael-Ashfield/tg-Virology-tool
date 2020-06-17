<script>
  import { onMount } from "svelte";
  import { ButtonToolbar, Button, Table } from "sveltestrap";
  import Save from "./save.svelte";
  import Clear from "./saveClear.svelte";
  import SaveItem from "./saveItem.svelte";
  import makeRequest from "./indexeddb.js";
  import { v_saves } from "../stores.js";

  let promise = getSaves();
  let saveData = [];
  let savedUpdate;

  const subscribe = v_saves.subscribe(value => {
    savedUpdate = value;
    if (!savedUpdate) {
      getSaves();
    }
  });

  async function getSaves() {
    const res = await makeRequest({ operation: "load" });
    saveData = res;

    if (res) {
      console.log("Loaded successfully");
    } else {
      throw new Error("Error in loading");
    }

    v_saves.set(true);
  }
</script>

<div>
  <div>
    <h2>Saved diseases</h2>
  </div>

  <table
    hover
    striped
    bordered
    class="table table-striped table-bordered table-hover">
    <thead class="thead-dark">
      <tr>
        <th>Name</th>
        <th>Stealth</th>
        <th>Resistance</th>
        <th>Stage speed</th>
        <th>Transmission</th>
        <th />
      </tr>

    </thead>

    <tbody>

      {#await promise}
        <tr>
          <td colspan="6">...waiting</td>
        </tr>
      {:then value}
        {#if saveData}
          {#each saveData as sItem}
            <tr>
              <SaveItem {sItem} />
            </tr>
          {/each}
        {:else}
          <p>There are no saved diseases yet</p>
        {/if}
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}

      <tr>
        <td colspan="6">
          <ButtonToolbar>
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <Save />
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
              <Clear />
            </div>
          </ButtonToolbar>
        </td>
      </tr>
    </tbody>

  </table>
</div>
