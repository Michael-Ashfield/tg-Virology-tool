<script>
  import { onMount } from "svelte";
  import { v_list } from "../stores.js";
  import { TableSort } from "svelte-tablesort";
  import Table_Item from "../components/table_item.svelte";

  let data = [];
  let v_curr = [];
  let visible = true;
  let tableItem;
  let sorted = 0;

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  onMount(() => {
    var elements = document.querySelectorAll(".symptomSortTable .sortable");
    Array.from(elements).forEach(function(element) {
      element.addEventListener("click", myFunction);
    });
  });

  var myFunction = function() {
    sorted++;
  };

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

  function echo() {
    console.log("sort updated");
    sorted++;
  }
</script>

<style>
  .svelte-fix {
    display: none;
  }

:global(table td, table th) {
    border: 1px solid silver;
  }

  :global(.descending:after, .ascending:after) {
    content: " ";
    position: relative;
    left: 50%;
    border: 5px solid transparent;
  }

  :global(.symptomTH.descending:after, .symptomTH.ascending:after) {
    left: 22px;
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

  th.rotated-text {
    height: 150px;
    white-space: nowrap;
    padding: 0 !important;
  }

  th.rotated-text > div {
    transform: translate(13px, 0px) rotate(270deg);
    width: 30px;
  }

  th.rotated-text > div > span {
    padding: 5px 10px;
  }

  .num-th {
    width: 3rem;
  }
</style>

<div class="table-responsive">
  <TableSort
    items={data}
    class="table table-striped table-bordered table-hover symptomSortTable fix-table">
    <tr slot="thead" class="thead-dark">
      <th
        data-sort="symptom"
        data-sort-initial="descending"
        class="rotated-text symptomTH">
        <div>
          <span>Symptom</span>
        </div>
      </th>
      <th data-sort="level" class="rotated-text num-th">
        <div>
          <span>Level</span>
        </div>
      </th>
      <th data-sort="stealth" class="rotated-text num-th">
        <div>
          <span>Stealth</span>
        </div>
      </th>
      <th data-sort="resistance" class="rotated-text num-th">
        <div>
          <span>Resistance</span>
        </div>
      </th>
      <th data-sort="stagespeed" class="rotated-text num-th">
        <div>
          <span>Stage speed</span>
        </div>
      </th>
      <th data-sort="transmission" class="rotated-text num-th">
        <div>
          <span>Transmission</span>
        </div>
      </th>
      <th class="fit" />
    </tr>
    <tr slot="tbody" let:item>
      <Table_Item {item} b_curr={false} {sorted} />
    </tr>
  </TableSort>
</div>
<div class="svelte-fix sortable ascending descending tablesort" />
