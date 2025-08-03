<template>
  <!-- Canvas will use the value of statsChart as ref -->
  <canvas ref="statsChart" id="stats-chart"></canvas>
</template>

<script setup>
// Import all necessary modules
import { onMounted, onBeforeUnmount, ref } from "vue";
import Chart from "chart.js/auto"; // Use chart.js api to create the charts

// Props needed for stats charts, all the values 
// are taken from pokemonDetailedData in DetailView.vue
const props = defineProps({
  hp: Number,
  atk: Number,
  dfs: Number,
  sp_atk: Number,
  sp_dfs: Number,
  spd: Number
});

// Use ref for chart canvas
const statsChart = ref(null);

// chart instance to use for resizing
let chart = null;

// Create chart on mounted
onMounted(() => {
  // Radar chart is used for this stats chart due to its readablity
  // The default size for chart is quite small -> manually set the font size in option
  chart = new Chart(statsChart.value, {
    type: "radar",
    data: {
      labels: ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Defense", "Speed"],
      datasets: [{
        label: "Stats value",
        data: [
            props.hp,
            props.atk,
            props.dfs,
            props.sp_atk,
            props.sp_dfs,
            props.spd,
        ],
        fill: true,
        backgroundColor: 'rgba(9, 111, 189, 0.5)',
        borderColor: 'rgba(47, 94, 130, 1)',
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          pointLabels: {
            font: {
              size: 14  // Increase the font size
            }
          }
        }
      }
    }
  });

  // Sometimes the chart is not responsive, invoke the event listener below
  // to update the size every time window size changes
  window.addEventListener("resize", handleResize);
});

// Clean up the event listener when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// For resizing responsiveness
const handleResize = () => {
  if (chart) {
    chart.resize(); // Explicitly resize the chart
    chart.update(); // Re-render the chart to reflect the new size
  }
};

</script>