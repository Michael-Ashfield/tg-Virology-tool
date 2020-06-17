<script>
  import { v_list } from "../stores.js";
  import { TableSort } from "svelte-tablesort";
  import Save from "./save.svelte";
  import Table_Item from "../components/table_item.svelte";

  let v_curr;

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });
</script>

<TableSort
  items={v_curr}
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
    <Table_Item {item} b_curr={true} />
  </tr>
  <tr slot="tfoot">
    <td colspan="7">
      <Save />
    </td>
  </tr>
</TableSort>
