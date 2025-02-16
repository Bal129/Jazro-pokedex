<template>
    
    <Suspense>
    <template #default>
        <div>
            <header class="py-2 custom-top-pokeball">
                <div class="container">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-start"> <!-- left -->
                            <RouterLink :to="{ name: 'main' }">
                                <a class="mx-2 my-1 p-2 btn border text-light">
                                    Home
                                </a>
                            </RouterLink>
                        </div>
                        <div class="col-6 d-flex justify-content-end"> <!-- right -->
                            <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) - 1 } }">
                                <a v-if="props.id > 1" class="mx-2 my-1 p-2 btn border text-light"> <!-- button previous -->
                                    Previous
                                </a>
                            </RouterLink>
                            <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) + 1 } }">
                                <a class="mx-2 my-1 p-2 btn border text-light"> <!-- button next -->
                                    Next
                                </a>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div class="container bg-light p-5">
                    <div class="row py-3 px-lg-5"> <!-- index and name -->
                        <div class="col-6"> <!-- index -->
                            <h1 class="text-muted">#{{ pokemonDetailedData.id }}</h1>
                            
                        </div>
                        <div class="col-6"> <!-- name -->
                            <h1 class="text-end">{{ capitalize(pokemonDetailedData.name) }}</h1>
                        </div>
                    </div>
                    <div class="row px-lg-5"> <!-- sprite, types, abilities and basic info -->
                        <div class="col-md-6 col-lg-6">
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
                                        :class="'type-'.concat(row.type.name)"
                                    >{{ capitalize(row.type.name) }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 py-4">
                            <div class="row py-4"> <!-- abilities -->
                                <h4 class="text-muted">Abilities</h4>
                                <div>
                                    <ul class="list-group d-flex justify-content-center">
                                        <li 
                                            class="list-group-item text-center"
                                            v-for="(row,index) in pokemonDetailedData.abilities"
                                        >{{ capitalize(row.ability.name) }}</li>
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
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span class="my-auto">
                                                Base Happiness
                                            </span>
                                            <span class="border p-2 rounded">
                                                {{ pokemonDetailedData.base_happiness }}
                                            </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span class="my-auto">
                                                Capture Rate (%)
                                            </span>
                                            <span class="border p-2 rounded">
                                                {{ pokemonDetailedData.capture_rate }}
                                            </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span class="my-auto">
                                                Growth Rate
                                            </span>
                                            <span class="border p-2 rounded">
                                                {{ capitalize(pokemonDetailedData.growth_rate) }}
                                            </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span class="my-auto">
                                                Habitat
                                            </span>
                                            <span class="border p-2 rounded">
                                                {{ capitalize(pokemonDetailedData.habitat) }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <StatsChart 
                        :hp="pokemonDetailedData.base_stats.hp"
                        :atk="pokemonDetailedData.base_stats.atk"
                        :dfs="pokemonDetailedData.base_stats.dfs"
                        :sp-atk="pokemonDetailedData.base_stats.sp_atk"
                        :sp-dfs="pokemonDetailedData.base_stats.sp_dfs"
                        :spd="pokemonDetailedData.base_stats.spd"
                    /> -->

                    <!-- Evolution(s) 

                    <div class="row"> 
                        <div 
                            v-for="pokemon in allDisplayCardData" :key="pokemon.id"
                        >
                            <RouterLink :to="{ name: 'detail', params: { id: pokemon.id } }">
                                <DisplayCard 
                                    :pokemon="pokemon"
                                />
                            </RouterLink>
                        </div>
                    </div>
                    
                    -->
                </div>
            </section>

            <ButtonToTop />
        </div>
    </template>

    <template #fallback>
        <div>
            hi
        </div>
    </template>
    </Suspense>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Chart from "chart.js/auto";
import ButtonToTop from "@/components/ButtonToTop.vue";
import DisplayCard from "@/components/DisplayCard.vue";
import StatsChart from "@/components/StatsChart.vue";

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
    base_happiness: 0,
    capture_rate: 0,
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

// onMounted(() => {
//     fetchData2();
// });

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
            flavor_text: speciesData.flavor_text_entries[0].flavor_text,
            base_happiness: speciesData.base_happiness,
            capture_rate: speciesData.capture_rate,
            growth_rate: speciesData.growth_rate.name,
            habitat: speciesData.habitat.name,
            evolutions: speciesData.evolution_chain.url
        };

        // Fetching data from evolution chain

        const evoChainResponse = await fetch(pokemonDetailedData.value.evolutions);
        const evoChainData = await evoChainResponse.json();

        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            evolutions: evoChainData.chain.evolves_to.map(
                evolution => evolution.species.name
            ),
        };

        pokemonDetailedData.value.evolutions.forEach(async evolution => {
            const evoDisplayCardResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`);
            const evoDisplayCardData = await evoDisplayCardResponse.json();

            displayCardData.value = {
                id: evoDisplayCardData.id,
                name: evoDisplayCardData.name,
                sprite: evoDisplayCardData.sprites.front_default,
                types: evoDisplayCardData.types
            }
            allDisplayCardData.value.push(displayCardData.value);

            // console.log(displayCardData.value);
        });

    } catch (error) {
        console.error("Error during fetch data: " + error);
    }
}

const route = useRoute();

watch(() => 
    route.params.id,
    (newId) => {
        fetchData2();
    },
    { immediate: true }
)

function capitalize(string) {
    if (typeof string !== "string") return;

    return string
    .split('-')
    .map(word =>
        word.charAt(0).toUpperCase() + word.substring(1)
    )
    .join(' ');
}

// function capitalize(string) {
//     return string.charAt(0).toUpperCase() + string.substring(1);
// }

</script>

<style>
    .custom-chart {
        width: 100%;
        height: 300px;
    }

    @media (min-width: 992px) {
        .custom-chart {
            width: 60%;
            height: auto;
        }
    }
</style>