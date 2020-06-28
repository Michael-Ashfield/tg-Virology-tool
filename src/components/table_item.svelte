<script>
  import { onMount } from "svelte";
  import { v_list } from "../stores.js";
  import { Collapse, Button } from "sveltestrap";
  import _ from "lodash";

  export let item;
  export let b_curr; // Boolean_Current, true if displayed in the current items list
  export let sorted = undefined;

  let thres = [];
  let v_curr = [];
  let isOpen = false;
  let status = "Show description";
  let disabledAdd = doesInclude(item, v_curr) ? "disabled" : "";

  onMount(() => {
    calcThres();
  });

  // Basically the table sort messes up the element order so this forces a re-render when the sort changes
  $: if (sorted) {
    remove(); // Removes nothing and forced a re-render
    calcThres();
    isOpen = false;
  }

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

  function calcThres() {
    if (item.threshold.length > 0) {
      thres = []; // reset thres
      item.threshold.forEach(element => {
        switch (element.type) {
          case "Stealth":
            thres.push(element);
            break;

          case "Resistance":
            thres.push(element);
            break;

          case "Stage speed":
            thres.push(element);
            break;

          case "Transmission":
            thres.push(element);
            break;

          default:
            break;
        }
      });
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

  function add(virus) {
    if (!doesInclude(virus, v_curr)) {
      if (v_curr.length < 6) {
        v_list.update(n => n.concat(virus));
      }
    }
  }

  function remove(virus) {
    let new_v_list = v_curr;
    if (virus) {
      new_v_list = _.filter(v_curr, e => {
        return !_.isMatch(e, virus); // isMatch used because of objects acting odd
      });
    }
    v_list.set(new_v_list);
  }
</script>

<style>
  .desc {
    font-size: 0.9rem;
  }
</style>

<td>
  <b>{item.symptom}</b>
  {#if !b_curr}
    <p on:click={() => (isOpen = !isOpen)} class="text-right">
      <em>{status}</em>
    </p>
    <Collapse {isOpen} {onEntering} {onEntered} {onExiting} {onExited}>
      <p>{item.description}</p>

      {#if thres.length > 0}
        <b>Thresholds</b>
        {#each thres as item}
          <p>
            <i>{item.type}: {item.value}</i>
            <br />
            <span class="desc">{item.desc}</span>
          </p>
        {/each}
      {/if}
    </Collapse>
  {/if}
</td>
<td>{item.level}</td>
<td>{item.stealth}</td>
<td>{item.resistance}</td>
<td>{item.stagespeed}</td>
<td>{item.transmission}</td>
<td class="fit">
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
