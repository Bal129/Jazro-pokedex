<template>
  <div v-if="errorFlag">
    <!-- Error screen -->
    <!-- Only display this screen when there is an error somewhere -->
    <div 
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh;"
    >
      <ErrorView/>
    </div>
  </div>
  <div v-else>
    <!-- Loading screen -->    
    <!-- By default, v-if is true, it will only change to false when data fetching is done -->
    <!-- style="height: 100vh;" used to ensure LoadingView.vue covers the whole screen -->
    <div 
      v-if="loading"
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh;"
    >
      <LoadingView/>
    </div>

    <!-- MainView.vue main contents -->
    <!-- This div only visible when loading is false (fetch is done) -->
    <div v-else class="custom-fade-in">
      <!-- Header that contains 'Pokedex' text and search functionality -->
      <Header @update-target="handleTargetUpdate" />

      <!-- A section that holds a 'Welcome' text and all the Pokemon display cards -->
      <section class="container bg-light">
        <Welcome :displayNum="numOfPokemon" />

        <!-- Displays the pokemon basic data cards that contains in search -->
        <!-- functionality, if search is empty, displays all data -->
        <div class="row py-3">
          <div
            v-for="pokemon in searchPokemon" :key="pokemon.id"
            class="col-12 col-md-6 col-lg-3"
          >
            <RouterLink 
              :to="{ name: 'detail', params: { id: pokemon.id } }" 
              style="text-decoration: none;"
            >
              <!-- DisplayCard displays all pokemon basic data -->
              <!-- pokemon in props contains id, name, sprite and types -->
              <DisplayCard :pokemon="pokemon" />
            </RouterLink>
          </div>
        </div>

        <End />
      </section>

      <!-- Other necessary components -->
      <ButtonToTop /> <!-- Component contains button that direct user to top -->
      <CustomFooter/> <!-- Component contains standardized footer -->
    </div>
  </div>
</template>

<script setup>
// Import all necessary modules 
import { ref, onMounted, computed, onUnmounted } from "vue";

// Import Views
import LoadingView from "../loading/LoadingView.vue"; // View component that displays during loading
import ErrorView from "../error/ErrorView.vue"; // Display error component when an error happens

// Components exclusive to MainView
import DisplayCard from "./components/DisplayCard.vue"; // Component to display all pokemon brief data
import Header from "./components/Header.vue";
import Welcome from "./components/Welcome.vue";
import End from "./components/End.vue";

// Components public for all views
import CustomFooter from "@/components/CustomFooter.vue"; // Standardized footer
import ButtonToTop from "@/components/ButtonToTop.vue";

const numOfPokemon = 100; // Set the number of pokemon to display in the MainView.vue
const allPokemonData = ref([]); // Store fetched pokemon data here
const loading = ref(true); // Show loading screen when data is still fetching
const errorFlag = ref(false); // Trigger this when an error occures

// Function to fetch all pokemon data then call fetchEachData()
async function fetchAllData() {
  try {
    loading.value = true; // Reassign value just to be safe

    // Set the limit of how many pokemons to display in MainView.vue
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numOfPokemon}`);
    const data = await response.json();

    const promises = data.results.map(eachData => fetchEachData(eachData));
    // use Promise.all to ensure all data is fetch first before continue with next line
    await Promise.all(promises); 

    // Due to async function, data are loaded out of order
    allPokemonData.value.sort((a,b) => a.id - b.id);

    // Reassign loading value to false to display the MainView.vue contents
    loading.value = false;    
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch all data: " + error);
  }
}

// Function to fetch each pokemon data into allPokemonData ref
async function fetchEachData(eachData) {
  let link = eachData.url;

  try {
    const eachReponses = await fetch(link);
    const eachData = await eachReponses.json();

    // After fetching all data, push them inside allPokemonData
    allPokemonData.value.push({
      id: eachData.id,
      name: eachData.name,
      sprite: eachData.sprites.front_default,
      types: eachData.types
    });        
  } catch (error) {
    errorFlag.value = true;
    console.error("Error during fetch each data: " + error);
  }
}

// Search functionality
const target = ref("");

const handleTargetUpdate = (newVal) => {
  target.value = newVal;
}

const searchPokemon = computed(() => {
  // Filter by comparing name data in search and allPokemonData
  return allPokemonData.value.filter(pokemon =>
    // Use toLowerCase() to ensure search is not case sensitive
    pokemon.name.toLowerCase().includes(target.value.toLowerCase())
  );
});

// Fetch all data once mounted
onMounted(() => {
  fetchAllData();
})

</script>