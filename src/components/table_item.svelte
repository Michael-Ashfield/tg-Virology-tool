<script>
  import { v_list } from "../stores.js";
  import { Collapse, Button } from "sveltestrap";
  import _ from "lodash";

  export let item;
  export let b_curr; // Boolean_Current, true if displayed in the current items list

  let v_curr = [];
  let isOpen = false;
  let status = "Show description";
  let disabledAdd = doesInclude(item, v_curr) ? "disabled" : "";

  const onEntering = () => (status = "Opening...");
  const onEntered = () => (status = "Close description");
  const onExiting = () => (status = "Closing...");
  const onExited = () => (status = "Show description");

  const list_subscribe = v_list.subscribe(value => {
    v_curr = value;
    disabledAdd = doesInclude(item, v_curr) ? "disabled" : "";
  });

  $: if (doesInclude(item, v_curr)) {
    disabledAdd = "disabled";
  }

  function add(virus) {
    if (!doesInclude(virus, v_curr)) {
      if (v_curr.length < 6) {
        v_list.update(n => n.concat(virus));
      }
    }
  }

  /**
   * @param item object The object to find
   * @param arr array of objects
   * @return boolean true if includes
   */
  function doesInclude(item, arr) {
    return _.some(arr, item);
  }

  function remove(virus) {
    let new_v_list = v_curr;
    new_v_list = _.filter(v_curr, e => {
      return !_.isMatch(e, virus); // isMatch used because of objects acting odd
    });
    v_list.set(new_v_list);
  }
</script>

<td>
  <b>{item.symptom}</b>
  {#if !b_curr}
    <p on:click={() => (isOpen = !isOpen)} class="text-right">
      <em>{status}</em>
    </p>
    <Collapse {isOpen} {onEntering} {onEntered} {onExiting} {onExited}>
      <p>{item.description}</p>
    </Collapse>
  {/if}
</td>
<td>{item.level}</td>
<td>{item.stealth}</td>
<td>{item.resistance}</td>
<td>{item.stagespeed}</td>
<td>{item.transmission}</td>
<td>
  {#if disabledAdd}
    <button class="btn btn-primary" on:click={() => remove(item)}>
      Remove
    </button>
  {:else}
    <button class="btn btn-primary {disabledAdd}" on:click={() => add(item)}>
      Add
    </button>
  {/if}

</td>
