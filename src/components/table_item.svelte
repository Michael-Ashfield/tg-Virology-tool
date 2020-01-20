<script>
  import { v_list } from "../stores.js";
  import { Collapse, Button } from "sveltestrap";

  export let item;

  let v_curr = [];
  let isOpen = false;
  let status = "Show description";

  const onEntering = () => (status = "Opening...");
  const onEntered = () => (status = "Show descripion");
  const onExiting = () => (status = "Closing...");
  const onExited = () => (status = "Close description");

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
</script>

<td>
  <b>{item.symptom}</b>
  <p on:click={() => (isOpen = !isOpen)} class="text-right">
    <em>{status}</em>
  </p>
  <Collapse {isOpen} {onEntering} {onEntered} {onExiting} {onExited}>
    <p>{item.description}</p>
  </Collapse>
</td>
<td>{item.level}</td>
<td>{item.stealth}</td>
<td>{item.resistance}</td>
<td>{item.stagespeed}</td>
<td>{item.transmission}</td>
<td>
  <button
    class="btn btn-primary {v_curr.includes(item) ? 'disabled' : ''}"
    on:click={() => add(item)}>
    Add
  </button>
</td>
