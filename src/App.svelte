<script>
  console.log("working");
  import { v_list } from "./stores.js";
  import { TableSort } from "svelte-tablesort";

  import CurrList from "./components/curr_list.svelte";
  import Totals from "./components/totals.svelte";
  import Table_Item from "./components/table_item.svelte";
  import Saves from "./components/saves.svelte";

  import { Col, Row, Container, Alert } from "sveltestrap";

  let data = [];
  let v_curr = [];
  let visible = true;

  const unsubscribe = v_list.subscribe(value => {
    v_curr = value;
  });

  async function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    };
    await rawFile.send(null);
  }

  //usage:
  readTextFile("data.json", function(text) {
    data = JSON.parse(text);
  });
</script>

<style>
  .svelte-fix {
    display: none;
  }
  .ascending {
    color: hotpink !important;
  }

  :global(table td, table th) {
    border: 1px solid silver;
  }

  :global(.descending:after, .ascending:after) {
    content: " ";
    position: relative;
    left: 5px;
    border: 5px solid transparent;
  }

  :global(.descending:after) {
    top: 14px;
    border-top-color: silver;
  }

  :global(.ascending:after) {
    bottom: 12px;
    border-bottom-color: silver;
  }

  :global(.descending, .ascending) {
    padding-right: 10px;
  }

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
        <TableSort
          items={data}
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
            <Table_Item {item} b_curr={false} />
          </tr>
        </TableSort>
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

  <div class="svelte-fix sortable ascending descending tablesort" />
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
