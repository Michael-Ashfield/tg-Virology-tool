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

<style>
  th.rotated-text {
    height: 140px;
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
    items={v_curr}
    class="table table-striped table-bordered table-hover table-sm fix-table">
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
      <th class="fit"/>
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
</div>
