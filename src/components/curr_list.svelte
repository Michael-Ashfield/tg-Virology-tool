<script>
  import { v_list } from "../stores.js";
  import { TableSort } from "svelte-tablesort";

  let v_curr;

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  function remove(item) {
    let new_v_list = v_curr;
    new_v_list = v_curr.filter(e => e !== item);
    v_list.set(new_v_list);
  }
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
    <td>{item.symptom}</td>
    <td>{item.level}</td>
    <td>{item.stealth}</td>
    <td>{item.resistance}</td>
    <td>{item.stagespeed}</td>
    <td>{item.transmission}</td>
    <td>
      <button class="btn btn-primary" on:click={() => remove(item)}>Remove</button>
    </td>
  </tr>
</TableSort>
