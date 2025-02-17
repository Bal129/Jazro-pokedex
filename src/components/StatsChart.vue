<template>
    <canvas ref="statsChart" id="stats-chart"></canvas>
</template>

<script setup>
import Chart from "chart.js/auto";
import { onMounted, onBeforeUnmount, ref } from "vue";
const props = defineProps({
    hp: Number,
    atk: Number,
    dfs: Number,
    sp_atk: Number,
    sp_dfs: Number,
    spd: Number,
    color: String
});
const statsChart = ref(null);
let chart = null;

onMounted(() => {
    chart = new Chart(statsChart.value, {
        type: "radar",
        data: {
            labels: ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Defense", "Speed"],
            datasets: [{
                label: "Base stats",
                data: [
                    props.hp,
                    props.atk,
                    props.dfs,
                    props.sp_atk,
                    props.sp_dfs,
                    props.spd,
                ],
                fill: true,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderColor: props.color,
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
                            size: 14  // Increase the font size of the axis labels
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 20  // Increase the font size of the legend
                        }
                    }
                }
            }
        }
    });

    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    // Clean up the event listener when the component is unmounted
    window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
    if (chart) {
        chart.resize(); // Explicitly resize the chart
        chart.update(); // Re-render the chart to reflect the new size
    }
};

</script>

<!-- <script setup>
import { watch } from 'vue';
import Chart from "chart.js/auto";

const props = defineProps(["hp, atk, dfs, sp_atk, sp_dfs, spd"]);
let chartInstance = null;  // To keep track of the chart instance

// Watch for changes in pokemonDetailedData and initialize the chart
watch(() => props, (newBaseStats) => {
    if (newBaseStats.hp !== 0) {  // Ensure data has been fetched
        if (chartInstance) {
            chartInstance.destroy();  // Destroy previous chart instance if it exists
        }
        
        const chartCanvas = document.getElementById("stats-chart");
        
        chartInstance = new Chart(chartCanvas, {
            type: "radar",
            data: {
                labels: ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Defense", "Speed"],
                datasets: [{
                    label: "Base stats",
                    data: [
                        newBaseStats.hp,
                        newBaseStats.atk,
                        newBaseStats.dfs,
                        newBaseStats.sp_atk,
                        newBaseStats.sp_dfs,
                        newBaseStats.spd,
                    ],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0
                    }
                }
            }
        });
    }
}, { immediate: true });
</script> -->