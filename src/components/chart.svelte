<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import { v_total } from "../stores.js";

  let ctx;
  let cht;
  let total;
  let initted = false;

  const unsubscribe = v_total.subscribe(value => {
    total = value;
  });

  onMount(() => {
    cht = document.getElementById("myChart");
    ctx = cht.getContext("2d");

    cht.width = "100%";
    initted = true; // Required for chart element to be rendered
  });

  const fillCol = x => {
    return x >= 0 ? `rgba(75, 192, 192, 0.2)` : `rgba(255, 99, 132, 0.2)`;
  };

  const borderCol = x => {
    return x >= 0 ? `rgba(75, 192, 192, 1)` : `rgba(255, 99, 132, 1)`;
  };

  let myChart;

  $: if (total) {
    if (myChart) {
      try {
        myChart.destroy(); // Remove the old graph so they dont overlap
      } catch (error) {
        console.log(error);
      }
    }
    myChart =
      initted &&
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Stealth", "Resistance", "Stage speed", "Transmission"],
          datasets: [
            {
              data: [
                total.stealth,
                total.resistance,
                total.stage_speed,
                total.transmission
              ],
              backgroundColor: [
                fillCol(total.stealth),
                fillCol(total.resistance),
                fillCol(total.stage_speed),
                fillCol(total.transmission)
              ],
              borderColor: [
                borderCol(total.stealth),
                borderCol(total.resistance),
                borderCol(total.stage_speed),
                borderCol(total.transmission)
              ],
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMin: -10,
                  suggestedMax: 10
                }
              }
            ]
          },
          legend: {
            display: false
          },
          animation: {
            duration: 2000
          },
          tooltips: {
            enabled: true
          }
        }
      });
  }
</script>

<style>
  .chart_container {
    width: 100%;
  }
  #myChart {
    width: 100%;
  }
</style>

<div class="chart_container">
  <canvas id="myChart" height="300" />
</div>
