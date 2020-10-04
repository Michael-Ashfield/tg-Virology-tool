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

  li + ul {
    padding-left: 20px;
  }
</style>

<div class="alertBox">
  <Alert color="primary" isOpen={visible} toggle={() => (visible = false)}>
    <h4 class="alert-heading text-capitalize">Get your own copy!</h4>
    This tool has an open
    <i>data.json</i>
    file which contains the data for every single symptom and allows you to
    add/remove symptoms, or to change symptom data. To change this data you need
    to install and run the code yourself. You can download your own version from
    <a
      class="alert-link"
      href="https://github.com/Michael-Ashfield/tg-Virology-tool">
      Github
    </a>
  </Alert>
</div>

<main>
  <Container class="container-fluid">
    <Row>
      <Col xs="12">
        <SymptomList />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md="8">
        <CurrList />
      </Col>

      <Col sm="12" md="4">
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
        <p>
          This tool was created to allow
          <strike>gamers</strike>
          developers to
          <strike>powergame</strike>
          quickly test and experient with new changes to /tg/ virology. All data
          in this app is accessable for developers to tinker with and add to.
          Obviously players can also use this tool to create and store their
          favourite diseases for virology.
        </p>
        <p>
          All data saves locally to your browser, there are no cookies in use,
          this site can be downloaded as a progressive web app to your device.
        </p>

      </div>
      <div class="col-sm">
        Todo list:
        <ul>
          <li>Import / Export save lists</li>
          <li>Live symptom value editor</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm createdBy">Created by Michael Ashfield 2020 ©</div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>
        <b>Changelog:</b>
      </p>
      <ul>
        <li>
          <i>2020-09-13:</i>
          Fixed narcolepsy threshold, speed become 10 and transmission became 4,
          was originally reversed.
        </li>
        <li>
          <i>2020-10-02:</i>
          Tissue hydration transmission changed from -1 to +1, the wiki values
          for the symptom was incrrect, this value has been taken from the
          codebase.
        </li>
        <li>
          <i>2020-10-04:</i>
          Some symptom values changed based on actual code.
          <ul>
            <li>Radioactive Resonance stage speed changed from 0 to 2</li>
            <li>Toxolysis stage speed changed from -2 to 2</li>
            <li>Hallucigen stage speed changed from -2 to -3</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</footer>
