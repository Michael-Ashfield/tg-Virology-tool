<script>
  import { v_list } from "./stores.js";
  import { TableSort } from "svelte-tablesort";
  
  import Curr_list from "./components/curr_list.svelte";
  import Totals from "./components/totals.svelte";
  import Table_Item from "./components/table_item.svelte";

  let data = [];
  let v_curr = [];

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  async function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    };
    await rawFile.send(null);
  }

  //usage:
  readTextFile("data.json", function(text) {
    data = JSON.parse(text);
  });

</script>

<style>
  .svelte-fix {
    display: none;
  }
  .ascending {
    color: hotpink !important;
  }

  :global(table td, table th) {
    border: 1px solid silver;
  }

  :global(.descending:after, .ascending:after) {
    content: " ";
    position: relative;
    left: 5px;
    border: 5px solid transparent;
  }

  :global(.descending:after) {
    top: 14px;
    border-top-color: silver;
  }

  :global(.ascending:after) {
    bottom: 12px;
    border-bottom-color: silver;
  }

  :global(.descending, .ascending) {
    padding-right: 10px;
  }
</style>

<main>
  <div class="container">
    <div class="row">
      <div class="col">
        <TableSort
          items={data}
          class="table table-striped table-bordered table-hover">
          <tr slot="thead" class="thead-dark">
            <th data-sort="symptom" data-sort-initial="descending">Symptom</th>
            <th data-sort="level">Level</th>
            <th data-sort="stealth">Stealth</th>
            <th data-sort="resistance">Resistance</th>
            <th data-sort="stagespeed">Stage speed</th>
            <th data-sort="transmission">Transmission</th>
            <th />
          </tr>
          <tr slot="tbody" let:item>
            <Table_Item item={item} b_curr={false}/>
          </tr>
        </TableSort>
      </div>
      <div class="col">
        <Curr_list />
      </div>
      <div class="col">
        <Totals />
      </div>

    </div>
  </div>

  <div class="svelte-fix sortable ascending descending tablesort" />
</main>
