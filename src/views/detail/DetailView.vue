<template>
  <!-- Error screen -->
  <!-- Only display this screen when there is an error somewhere -->
  <div 
    v-if="errorFlag"
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh;"
  >
    <ErrorView />
  </div>

  <div v-else>
    <Header :id="pokemonStore.id" />

    <!-- Loading screen -->
    <!-- By default, v-if is true, it will only change to false when data fetching is done -->
    <!-- style="height: 100vh;" used to ensure LoadingView.vue covers the whole screen -->
    <div 
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh;"
      v-if="loading"
    >
      <LoadingView/>
    </div>

    <!-- Main contents for DetailView.vue -->
    <!-- This div only visible when loading is false (fetch is done) -->
    
    <section v-else class="container font-monospace c-anim-fade-in p-5">
      <!-- Extra spacing for visual appeal -->
      <div class="row py-4"></div>

      <!-- A row to display name -->
      <div class="row py-3 px-lg-5">
        <div class="col">
          <h3 class="display-3 text-center fw-bold">
            {{ capitalize(pokemonStore.name) }}
          </h3>
        </div>
      </div>

      <!-- A row to display profile, abilities and basic info  -->
      <div class="row px-lg-5 d-flex justify-content-center align-items-center"> <!-- sprite, types, abilities and basic info -->
        <!-- The left column to display profile (sprite, flavor text, and types) -->
        <div class="col-md-6 col-lg-6 my-3">
          <Profile
            :color="pokemonStore.color"
            :sprite="pokemonStore.sprite"
            :flavor_text="pokemonStore.flavor_text"
            :types="pokemonStore.types"
          />
        </div>
        <!-- The right column to display abilities and basic info -->
        <div class="col-md-6 col-lg-6 py-4">
          <!-- Display abilities -->
          <div class="row py-4">
            <h4 class="text-muted">Abilities</h4>
            <Abilities 
              :abilities="pokemonStore.abilities"
            />
          </div>
          <!-- Display basic information (base exp, height, weight, base happiness -->
          <!--                            capture rate, growth rate)               -->
          <div class="row py-4">
            <h4 class="text-muted">Basic Information</h4>
            <BasicInfo
              :items="[
                {header:'Base Experience',data:pokemonStore.base_exp},
                {header:'Height (m)',data:pokemonStore.height},
                {header:'Weight (kg)',data:(pokemonStore.weight / 10).toFixed(1)},
                {header:'Base Happiness',data:pokemonStore.base_happiness},
                {header:'Capture Rate',data:pokemonStore.capture_rate},
                {header:'Growth Rate',data:capitalize(pokemonStore.growth_rate)}
              ]"
            />
          </div>
        </div>
      </div>

      <hr/>

      <!-- A row to display stats chart (health, attack, defense, special attack -->
      <!--                               special defense, speed)                 -->
      <div class="row justify-content-center py-4">
        <h4 class="text-muted">Base stats</h4>
        <div class="col-12 col-lg-6 col-xl-6 col-xxl-6">
          <StatsChart
            :hp="pokemonStore.base_stats.hp"
            :atk="pokemonStore.base_stats.atk"
            :dfs="pokemonStore.base_stats.dfs"
            :sp_atk="pokemonStore.base_stats.sp_atk"
            :sp_dfs="pokemonStore.base_stats.sp_dfs"
            :spd="pokemonStore.base_stats.spd"
            :color="pokemonStore.color"
          />
        </div>
      </div>

      <hr/>

      <!-- A row to display locations (contains locaiton names and games) -->
      <div class="row justify-content-center py-4">
        <h4 class="text-muted">Locations</h4>
        <Locations
          :items="pokemonStore.location_info"
          :color="pokemonStore.color"
        />
      </div>

      <hr/>

      <!-- A row to display locations (contains locaiton names and games) -->
      <div class="row justify-content-center py-4">
        <h4 class="text-muted">Edit Store</h4>
        <div class="p-4 text-center">
          <div @click="toggleEnableEdit" class="c-edit-button">
            <i v-if="!enableEdit">Edit </i>
            <i v-else>Done </i>
            <i class="fa fa-edit"></i>
          </div>
        </div>
        <EditStore
          v-if="enableEdit"
          :pokemon="pokemonStore"
        />
      </div>
    </section>

    <!-- Other necessary components -->
    <ButtonToTop /> <!-- Component contains button that direct user to top -->
    <CustomFooter/> <!-- Component contains standardized footer -->
  </div>
</template>

<script setup>

// Import all necessary modules
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "@/stores/pokemonStore"; // Store for pinia
import { capitalize } from "@/utils/global"; // My custom module, for text capitalization

// Import Components for template in DetailView.vue
import Header from "@/views/detail/components/Header.vue";
import LoadingView from "../loading/LoadingView.vue"; // Loading screen view
import ErrorView from "../error/ErrorView.vue"; // Display error component when an error happens
import CustomFooter from "@/components/CustomFooter.vue"; // Standardized footer
import ButtonToTop from "@/components/ButtonToTop.vue"; // Enables button to top

// Import components for DetailView.vue
import Profile from "@/views/detail/components/Profile.vue"; // Display profile (sprite, flavor text, types)
import Abilities from "@/views/detail/components/Abilities.vue"; // Display abilites
import BasicInfo from "@/views/detail/components/BasicInfo.vue" // General information (weight, height etc.)
import StatsChart from "@/views/detail/components/StatsChart.vue"; // Base stats chart
import Locations from "@/views/detail/components/Locations.vue"; // Location table
import EditStore from "@/views/detail/components/EditStore.vue";

// props contain id, for fetching data, receive this when click on pokemon card in MainView.vue
const props = defineProps(["id"]);

// All the necessary data used in Pokemon details
// Some data can be obtained in different url for example:
//   1) fetchPokemonData = id, name, sprite, etc.
//   2) fetchSpeciesData = flavor_text, growth_rate, etc.
//   3) fetchLocationData = location_info
// Refer to comments above each functions for more detail

const pokemonDetailedData = ref({
  id: 0,
  name: "Name",
  sprite: "Sprite",
  types: "Type",
  color: "black",
  abilities: "Ability",
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
  growth_rate: "n/a",
  evolutions: "n/a",
  locations_url: "",
  location_info: {}
})

// Pinia Implementation - use the pokemonStore to keep all important information
const pokemonStore = usePokemonStore();

const loading = ref(true); // For loading check, set to 'false' when done fetching, 
                           // During 'true', loading screen is displayed instead
const errorFlag = ref(false); // Trigger this when an error occures

// Fetch all data required for DetailView.vue
async function fetchAllData () {
  try {
    loading.value = true; // Reassign value just to be safe

    // fetch id, name, sprite, types, abilities, base_exp, height, weight, base_stats, locations_url
    await fetchPokemonData();
    // fetch color, flavor_text, base_happiness, capture_rate, evolutions
    await fetchSpeciesData();
    // fetch location
    await fetchLocationData();

    // After all the fetching is done, insert all data into pinia store
    pokemonStore.setPokemonData(pokemonDetailedData.value);

    loading.value = false; // Reassign loading value to false to display the MainView.vue contents
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch all data: " + error);
  }
}

// To fetch id, name, sprite, types, abilities, base_exp, height, weight, base_stats, locations_url
async function fetchPokemonData() {
  try {
    // fetch pokemon data using the props.id as reference
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
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch pokemon data: " + error);
  }
}

// To fetch color, flavor_text, base_happiness, capture_rate, evolutions
async function fetchSpeciesData() {
  try {
    // fetch pokemon species data using the props.id as reference
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`);
    const speciesData = await speciesResponse.json();

    pokemonDetailedData.value = {
        ...pokemonDetailedData.value,
        color: speciesData.color.name,
        flavor_text: speciesData.flavor_text_entries[0].flavor_text,
        base_happiness: speciesData.base_happiness,
        capture_rate: speciesData.capture_rate,
        growth_rate: speciesData.growth_rate.name,
        evolutions: speciesData.evolution_chain.url
    };
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch pokemon species data: " + error);
  }
}

// To fetch location
async function fetchLocationData() {
  try {
    // Fetch pokemon location data using the props.id as reference
    const locationResponse = await fetch(pokemonDetailedData.value.locations_url);
    const locationData = await locationResponse.json();

    // LocationData contains multiple data, only need location name and its game here
    // Push each data into locationInfoArray first then into pokemonDetailedData
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

    // Push the data inside location_info after done fetching without error
    pokemonDetailedData.value = {
      ...pokemonDetailedData.value,
      location_info: locationInfoArray
    }
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch pokemon location data: " + error);
  }
}

// To toggle between edit and non-edit pinia state
const enableEdit = ref(false);
function toggleEnableEdit() {
  enableEdit.value = !enableEdit.value;
}

// To ensure that the display refresh every time a data was changed
const route = useRoute();
watch(() => 
  route.params.id,
  () => fetchAllData(),
  { immediate: true }
)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

</script>