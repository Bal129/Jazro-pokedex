<template>
    <header class="py-2 bg-dark">
        
    </header>
    <section>
        <div class="container bg-light">
            <div class="row py-3"> <!-- index and name -->
                <div class="col-6"> <!-- index -->
                    <h1 class="text-muted">#{{ pokemonDetailedData.id }}</h1>
                    
                </div>
                <div class="col-6"> <!-- name -->
                    <h1 class="text-end">{{ pokemonDetailedData.name }}</h1>
                </div>
            </div>
            <div class="row"> <!-- sprite, types, abilities and basic info -->
                <div class="col-sm-1 col-md-1 col-lg-6">
                    <div class="row p-4"> <!-- sprite -->
                        <img
                            class="border rounded"
                            v-bind:src="pokemonDetailedData.sprite" 
                            alt="Sprite" 
                        />
                    </div>
                    <div class="row"> <!-- flavor text -->
                        <p class="text-muted py-3 text-center">
                            {{ pokemonDetailedData.flavor_text }}
                        </p>
                    </div>
                    <div class="row"> <!-- types -->
                        <ul class="list-group list-group-horizontal d-flex justify-content-center">
                            <li 
                                class="list-group-item text-center"
                                v-for="row in pokemonDetailedData.types"
                            >{{row.type.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-1 col-md-1 col-lg-6 py-4">
                    <div class="row py-4"> <!-- abilities -->
                        <h4 class="text-muted">Abilities</h4>
                        <div>
                            <ul class="list-group d-flex justify-content-center">
                                <li 
                                    class="list-group-item text-center"
                                    v-for="(row,index) in pokemonDetailedData.abilities"
                                >{{ row.ability.name }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row py-4"> <!-- basic info -->
                        <h4 class="text-muted">Basic Information</h4>
                        <div>
                            <ul class="list-group d-flex justify-content-center">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span class="my-auto">
                                        Base Experience
                                    </span>
                                    <span class="border p-2 rounded">
                                        {{ pokemonDetailedData.base_exp }}
                                    </span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span class="my-auto">
                                        Height (m)
                                    </span>
                                    <span class="border p-2 rounded">
                                        {{ (pokemonDetailedData.height / 10).toFixed(1) }}
                                    </span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span class="my-auto">
                                        Weight (kg)
                                    </span>
                                    <span class="border p-2 rounded">
                                        {{ (pokemonDetailedData.weight / 10).toFixed(1) }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"> <!-- Base stats radar chart -->
                <div class="row">
                    <h4 class="text-muted">Base Stats</h4>
                </div>
                <div class="row">
                    <canvas id="stats-chart"></canvas>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const index = 11;

const pokemonDetailedData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {},
    abilities: {},
    flavor_text: "Flavor Text",
    base_exp: 0,
    height: 0,
    weight: 0,
    base_stats: 
    {
        hp: 0,
        atk: 0,
        dfs: 0,
        sp_atk: 0,
        sp_dfs: 0,
        spd: 0
    },
    evolutions: 
    {
        id: "0",
        name: "Name",
        sprite: "Sprite",
        type: {}
    },

})

onMounted(() => {
    fetchData2();
});

function createStatsChart() {
    const chartCanvas = document.getElementById("stats-chart");
    new Chart(chartCanvas, {
        type: "radar",
        data: {
            labels: ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Defense", "Speed"],
            datasets: [{
                label: "Base stats",
                data: [
                    pokemonDetailedData.value.base_stats.hp,
                    pokemonDetailedData.value.base_stats.atk,
                    pokemonDetailedData.value.base_stats.dfs,
                    pokemonDetailedData.value.base_stats.sp_atk,
                    pokemonDetailedData.value.base_stats.sp_dfs,
                    pokemonDetailedData.value.base_stats.spd,
                ],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        },
        // options: {
        //     scales: {
        //         r: {
        //             angleLines: {
        //                 display: false
        //             },
        //             suggestedMin: 50,
        //             suggestedMax: 100
        //         }
        //     }
        // }
    });
}

function fetchData() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(response => response.json())
    .then(data => {
        pokemonDetailedData.value = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types,
            abilities: data.abilities,
            base_stats:
            {
                hp: data.stats[0].base_stat,
                atk: data.stats[1].base_stat,
                dfs: data.stats[2].base_stat,
                sp_atk: data.stats[3].base_stat,
                sp_dfs: data.stats[4].base_stat,
                spd: data.stats[5].base_stat
            },
        }
    })
    .catch(error => console.error("Error during fetch data: " + error));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
    .then(response => response.json())
    .then(data => {
        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            flavor_text: data.flavor_text_entries[0].flavor_text
        }
    })
    .catch(error => console.error("Error during fetch data: " + error));

    // fetch(`https://pokeapi.co/api/v2/evolution-chain/${index}/`)
    // .then(response => response.json())
    // .then(data => {
    //     pokemonDetailedData.value = {
    //         evolutions:
    //         {
    //             id: 
    //         }
    //     }
    // })
}

const fetchData2 = async() => {
    try {
        // Fetching data from pokemon

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const pokemonData = await pokemonResponse.json();
        
        pokemonDetailedData.value = {
            id: pokemonData.id,
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
            types: pokemonData.types,
            abilities: pokemonData.abilities,
            base_exp: pokemonData.base_experience,
            height: pokemonData.height,
            weight: pokemonData.weight,
            base_stats: {
                hp: pokemonData.stats[0].base_stat,
                atk: pokemonData.stats[1].base_stat,
                dfs: pokemonData.stats[2].base_stat,
                sp_atk: pokemonData.stats[3].base_stat,
                sp_dfs: pokemonData.stats[4].base_stat,
                spd: pokemonData.stats[5].base_stat
            },
        };

        // Fetching data from pokemon species

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`);
        const speciesData = await speciesResponse.json();
        
        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            flavor_text: speciesData.flavor_text_entries[0].flavor_text
        };
    } catch (error) {
        console.error("Error during fetch data: " + error);
    }
}

let chartInstance = null;  // To keep track of the chart instance

// Watch for changes in pokemonDetailedData and initialize the chart
watch(() => pokemonDetailedData.value.base_stats, (newBaseStats) => {
    if (newBaseStats.hp !== 0) {  // Ensure data has been fetched
        if (chartInstance) {
            chartInstance.destroy();  // Destroy previous chart instance if it exists
        }

        console.log(newBaseStats.hp);
        
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