<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from "sveltestrap";
  import makeRequest from "./indexeddb.js";
  import { v_saves } from "../stores.js";  

  let open = false;

  const toggle = () => (open = !open);

  function clear() {
    makeRequest({ operation: "clear" });
    v_saves.set(false);
    open = false;
  }
</script>

<div>
  <Button on:click={toggle} outline danger color="danger">Clear All</Button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>
      Are you sure?
    </ModalHeader>
    <ModalBody>
      <p>
        <b>
          Are you sure you wish to clear all saved diseases, this cannot be
          undone.
        </b>
      </p>
    </ModalBody>
    <ModalFooter>
      <Button color="danger" on:click={clear}>Clear</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>
