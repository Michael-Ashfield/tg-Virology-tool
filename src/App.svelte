<script>
  import CurrList from "./components/curr_list.svelte";
  import Totals from "./components/totals.svelte";
  import Table_Item from "./components/table_item.svelte";
  import Saves from "./components/saves.svelte";
  import SymptomList from "./components/symptomList.svelte";

  import { Col, Row, Container, Alert } from "sveltestrap";

  let visible = true;
  
</script>

<style>


  .alertBox {
    margin: 5px;
  }

  footer {
    font-size: 0.9rem;
  }
  .createdBy {
    font-size: 0.8rem;
  }
</style>

<div class="alertBox">
  <Alert color="warning" isOpen={visible} toggle={() => (visible = false)}>
    <h4 class="alert-heading text-capitalize">Work in progress</h4>
    This tool is still a work in progress and will be updated without warning,
    this may cause you to lose your saved diseases. You can download your own
    stable version from
    <a
      class="alert-link"
      href="https://github.com/Michael-Ashfield/tg-Virology-tool">
      Github
    </a>
    .
  </Alert>
</div>

<main>
  <Container>
    <Row>
      <Col xs="12">
        <SymptomList />
      </Col>
      <Col xs="8">
        <CurrList />
      </Col>
      <Col xs="4">
        <Totals />
      </Col>
    </Row>
    <Row>
      <Col>
        <Saves />
      </Col>
    </Row>
  </Container>
</main>

<footer class="p-3 mb-2 bg-dark text-white">
  <div class="container">
    <div class="row">
      <div class="col-sm">
        This tool was created to allow
        <strike>gamers</strike>
        developers to
        <strike>powergame</strike>
        quickly test and experient with new changes to /tg/ virology. All data
        in this app is accessable for developers to tinker with and add to.
        Obviously players can also use this tool to create and store their
        favourite diseases for virology.
      </div>
      <div class="col-sm">
        Todo list:
        <ul>
          <li>Thresholds in totals</li>
          <li>Thresholds in symptom list</li>
          <li>Threshold descriptions</li>
          <li>Import / Export save lists</li>
          <li>Live symptom value editor</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm createdBy">Created by Michael Ashfield 2020 ©</div>
    </div>
  </div>
</footer>
