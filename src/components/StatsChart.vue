<template>
    <div class="row"> <!-- Base stats radar chart -->
        <div class="row">
            <h4 class="text-muted">Base Stats</h4>
        </div>
        <div class="row custom-chart">
            <canvas id="stats-chart"></canvas>
        </div>
    </div>
</template>

<script setup>
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
</script>