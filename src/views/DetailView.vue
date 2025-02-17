<template>
    <div v-if="loading">Loading....</div>
    <div v-else>
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
        <section class="container bg-light p-5">
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
                        <div 
                            class="custom-img-border"
                            :style="{borderColor:pokemonDetailedData.color}"
                        > <!-- sprite -->
                            <div 
                                class="row m-1 p-4 custom-img-border"
                            >
                                <img
                                    v-bind:src="pokemonDetailedData.sprite" 
                                    alt="Sprite" 
                                />
                            </div>
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
                            <BasicInfo
                                :items="[
                                    {header:'Base Experience',data:pokemonDetailedData.base_exp},
                                    {header:'Height (m)',data:pokemonDetailedData.height},
                                    {header:'Weight (kg)',data:(pokemonDetailedData.weight / 10).toFixed(1)},
                                    {header:'Base Happiness',data:pokemonDetailedData.base_happiness},
                                    {header:'Capture Rate',data:pokemonDetailedData.capture_rate},
                                    {header:'Growth Rate',data:capitalize(pokemonDetailedData.growth_rate)},
                                    {header:'Habitat',data:capitalize(pokemonDetailedData.habitat)}
                                ]"
                            />
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
            <div class="row justify-content-center py-4">
                <div class="col-12 col-lg-6 col-xl-6 col-xxl-6">
                    <StatsChart
                        :hp="pokemonDetailedData.base_stats.hp"
                        :atk="pokemonDetailedData.base_stats.atk"
                        :dfs="pokemonDetailedData.base_stats.dfs"
                        :sp_atk="pokemonDetailedData.base_stats.sp_atk"
                        :sp_dfs="pokemonDetailedData.base_stats.sp_dfs"
                        :spd="pokemonDetailedData.base_stats.spd"
                        :color="pokemonDetailedData.color"
                    />
                </div>
            </div>
            <div class="row justify-content-center py-4 m-4">
                <h4 class="text-muted">Locations</h4>
                <Locations
                    :items="pokemonDetailedData.location_info"
                />
            </div>
        </section>

        

        <ButtonToTop />
        
        <CustomFooter/>
        
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Chart from "chart.js/auto";
import ButtonToTop from "@/components/ButtonToTop.vue";
import DisplayCard from "@/components/DisplayCard.vue";
import StatsChart from "@/components/StatsChart.vue";
import Locations from "@/components/detailview/Locations.vue";
import BasicInfo from "@/components/detailview/BasicInfo.vue"
import CustomFooter from "@/components/CustomFooter.vue";
import { capitalize } from "@/utils/global";

const props = defineProps(["id"]);

const pokemonDetailedData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {},
    color: "black",
    abilities: {},
    flavor_text: "Flavor Text",
    base_exp: 0,
    height: 0,
    weight: 0,
    base_stats: {
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
    locations_url: "",
    location_info: {}
})

const allLocationsData = ref({

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

const loading = ref(true);

const fetchData = async() => {
    try {
        // Fetching data from pokemon

        loading.value = true;

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
            locations_url: pokemonData.location_area_encounters
        };

        // Fetching data from pokemon species

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`);
        const speciesData = await speciesResponse.json();
        
        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            color: speciesData.color.name,
            flavor_text: speciesData.flavor_text_entries[0].flavor_text,
            base_happiness: speciesData.base_happiness,
            capture_rate: speciesData.capture_rate,
            growth_rate: speciesData.growth_rate.name,
            habitat: speciesData.habitat.name,
            evolutions: speciesData.evolution_chain.url
        };

        // Fetching data from locations

        const locationResponse = await fetch(pokemonDetailedData.value.locations_url);
        const locationData = await locationResponse.json();

        let locationInfoArray = [];

        locationData.forEach((locations) => {
            let gamesNames = [];
            
            locations.version_details.forEach((versions) => {
                gamesNames.push(versions.version.name);
            })

            locationInfoArray.push({
                locationName: locations.location_area.name,
                gamesName: gamesNames
            })
        });

        pokemonDetailedData.value = {
            ...pokemonDetailedData.value,
            location_info: locationInfoArray
        }

        console.log(pokemonDetailedData.value.location_info);

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

        loading.value = false;

    } catch (error) {
        console.error("Error during fetch data: " + error);
    }
}

const route = useRoute();

watch(() => 
    route.params.id,
    (newId) => {
        fetchData();
    },
    { immediate: true }
)

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