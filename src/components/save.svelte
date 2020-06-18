<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormGroup,
    Input,
    Label
  } from "sveltestrap";
  import { v_total, v_list, v_saves } from "../stores.js";
  import makeRequest from "./indexeddb.js";

  let total;
  let v_curr;
  let open = false;
  let diseaseName = "";
  let inputElement;
  let nameNull = false;

  const toggle = () => {
    open = !open;
  };

  const ran = () => {
    let num = Math.floor(Math.random() * 20) + 1; // this will get a number between 1 and 99;
    return num;
  };

  const total_subscribe = v_total.subscribe(value => {
    total = value;
  });

  const list_subscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  function saveTest() {
    if (diseaseName) {
      nameNull = false;
      makeRequest({
        operation: "save",
        payload: {
          name: diseaseName,
          list: v_curr,
          totals: total
        }
      });
      open = false;
      diseaseName = "";
      v_saves.set(false);
    } else {
      nameNull = true;
    }
  }
</script>

<div>
  <button
    on:click={toggle}
    class="btn btn-primary {v_curr.length == 0 ? 'disabled' : ''}">
    Save current
  </button>
  <Modal isOpen={open} {toggle} bind:this={inputElement}>
    <ModalHeader {toggle}>Save disease</ModalHeader>
    <ModalBody>
      <form on:submit|preventDefault={saveTest}>
        <FormGroup>
          <Label for="diseaseName">Name your disease</Label>
          <Input
            bind:value={diseaseName}
            text
            value="diseaseName"
            placeholder="Disease name"
            id="diseaseNameInput"
            name="diseaseName"
            class={nameNull && 'is-invalid'}
            required
            autofocus />
          <div class="invalid-feedback">A disease name is required</div>
        </FormGroup>
        <Button type="submit" color="primary" on:click={saveTest}>Save</Button>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
      </form>
    </ModalBody>
    <ModalFooter />
  </Modal>
</div>
