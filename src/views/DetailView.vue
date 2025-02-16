<template>
    <header class="py-2 bg-dark">
        <div class="container">
            <div class="d-flex justify-content-between">
                <RouterLink :to="{ name: 'main' }">
                    <button class="btn text-light">
                        Home
                    </button>
                </RouterLink>
                <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) - 1 } }">
                    <button v-if="props.id > 1" class="btn text-light"> <!-- button previous -->
                        Previous
                    </button>
                </RouterLink>
                <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) + 1 } }">
                    <button class="btn text-light"> <!-- button next -->
                        Next
                    </button>
                </RouterLink>
            </div>
        </div>
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
            <div class="row"> <!-- Evolution(s) -->
                <DisplayCard 
                    :pokemon="{

                    }"
                />
            </div>
        </div>
    </section>

    <ButtonToTop />

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Chart from "chart.js/auto";
import ButtonToTop from "@/components/ButtonToTop.vue";
import DisplayCard from "@/components/DisplayCard.vue";

const props = defineProps(["id"]);

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
    growth_rate: "",
    habitat: "",
    evolutions: "",

})

const allDisplayCardData = ref([]);
const displayCardData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {},
})

onMounted(() => {
    fetchData2();
});

const fetchData2 = async() => {
    try {
        // Fetching data from pokemon

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`);
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

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`);
        const speciesData = await speciesResponse.json();
        
        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            flavor_text: speciesData.flavor_text_entries[0].flavor_text
        };

        // Fetching data from evolution chain

        const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${props.id}`);
        const evolutionData = await evolutionResponse.json();

        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            evolutions: evolutionData.chain.evolves_to.map(
                evolution => evolution.species.url
            ),
        };

        pokemonDetailedData.value.evolutions.forEach(async evolution => {
            const evoDisplayCardResponse = await fetch(evolution);
            const evoDisplayCardData = await evoDisplayCardResponse.json();

            displayCardData.value = {
                id: evoDisplayCardData.id,
                name: capitalize(evoDisplayCardData.name),
                sprite: evoDisplayCardData.sprites.front_default,
                types: evoDisplayCardData.types
            }
            allDisplayCardData.value.push(evoDisplayCardData.value);

            console.log(displayCardData.value);
        });

    } catch (error) {
        console.error("Error during fetch data: " + error);
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

const route = useRoute();

watch(() => 
    route.params.id,
    (newId) => {
        fetchData2();
    },
    { immediate: true }
)

let chartInstance = null;  // To keep track of the chart instance

// Watch for changes in pokemonDetailedData and initialize the chart
watch(() => pokemonDetailedData.value.base_stats, (newBaseStats) => {
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