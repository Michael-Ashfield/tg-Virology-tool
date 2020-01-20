<script>
  import { v_list } from "../stores.js";
  import { Collapse, Button } from "sveltestrap";

  export let item;
  export let b_curr; // Boolean_Current, true if displayed int he current items list

  let v_curr = [];
  let isOpen = false;
  let status = "Show description";

  const onEntering = () => (status = "Opening...");
  const onEntered = () => (status = "Close description");
  const onExiting = () => (status = "Closing...");
  const onExited = () => (status = "Show description");

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  function add(virus) {
    if (!v_curr.includes(virus)) {
      if (v_curr.length < 6) {
        v_list.update(n => n.concat(virus));
      }
    }
  }

  function remove(virus) {
    let new_v_list = v_curr;
    new_v_list = v_curr.filter(e => e !== virus);
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
  {#if b_curr}
    <button class="btn btn-primary" on:click={() => remove(item)}>
      Remove
    </button>
  {:else}
    <button
      class="btn btn-primary {v_curr.includes(item) ? 'disabled' : ''}"
      on:click={() => add(item)}>
      Add
    </button>
  {/if}

</td>
