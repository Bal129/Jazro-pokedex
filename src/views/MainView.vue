<template>
    <!-- Error screen -->
    <!-- Only display this screen when there is an error somewhere -->
    <div v-if="errorFlag">
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
            class="d-flex justify-content-center align-items-center"
            style="height: 100vh;"
            v-if="loading"
        >
            <LoadingView/>
        </div>

        <!-- MainView.vue main contents -->
        <!-- This div only visible when loading is false (fetch is done) -->
        <div v-else class="custom-fade-in">
            <!-- Header that contains 'Pokedex' text and search functionality -->
            <header class="py-2 fixed-top custom-top-pokeball custom-navbar-anim-top">
                <div class="container d-flex justify-content-between align-items-center">
                    <!-- 'Pokedex' text just for visual appeal -->
                    <h2 class="text-light">Pokedex</h2>
                    <div>
                        <!-- Search uses 'target' as a v-model -->
                        <input 
                            class="border rounded px-3"
                            type="text" placeholder="Search..." 
                            v-model="target"
                        />
                        <!-- Search icon just for visual appeal -->
                        <i class="fas fa-search px-2">
                        </i>
                    </div>
                </div>
            </header>
            
            <!-- A section that holds a 'Welcome' text and all the Pokemon display cards -->
            <section>
                <div class="container bg-light">
                    <!-- Extra spacing for visual appeal -->
                    <div class="row py-5"></div>
                    <div class="row py-3">
                        <!-- Text and intro for user -->
                        <h1 class="text-center">Welcome</h1>
                        <h6 
                            class="text-muted text-center"
                        >
                            This is a list of Pokemons from index 1 to {{numOfPokemon}}. <br/>
                            Click on one of the Pokemons to view their details or search your 
                            favorite Pokemon using the search functionality on top!
                        </h6>
                    </div>
                    
                    <!-- Extra spacing for visual appeal -->
                    <div class="row pb-5 mx-2">
                        <i class="text-center fas fa-chevron-down fa-2x custom-floating"></i>
                    </div>

                    <div class="row py-3">
                        <!-- Displays the pokemon basic data cards that contains in search
                        functionality, if search is empty, displays all data
                        -->
                        <div  
                            class="col-12 col-md-6 col-lg-3"
                            v-for="pokemon in searchPokemon" :key="pokemon.id"
                        >
                            <RouterLink 
                                :to="{ name: 'detail', params: { id: pokemon.id } }" 
                                style="text-decoration: none;"
                            >
                                    <!-- DisplayCard displays all pokemon basic data -->
                                    <!-- pokemon in props contains id, name, sprite and types -->
                                    <DisplayCard
                                        :pokemon="pokemon"
                                    />             
                            </RouterLink>
                        </div>
                    </div>
                    
                    <!-- Extra spacing for visual appeal -->
                    <div class="row py-5 mx-2">
                        <i class="p-2 text-center fa fa-check-square fa-2x"></i>
                        <h5 class="text-muted text-center">End of page</h5>
                    </div>

                </div>
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
import ButtonToTop from "@/components/ButtonToTop.vue"; // Component that enables button to top
import CustomFooter from "@/components/CustomFooter.vue"; // Standardized footer
import LoadingView from "./LoadingView.vue"; // View component that displays during loading
import ErrorView from "./ErrorView.vue"; // Display error component when an error happens
import DisplayCard from "../components/mainview/DisplayCard.vue"; // Component to display all pokemon brief data

const numOfPokemon = 100; // Set the number of pokemon to display in the MainView.vue

const allPokemonData = ref([]); // Store fetched pokemon data here
const pokemonData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {}
});

const loading = ref(true); // For loading check, set to 'false' when done fetching, 
                           // During 'true', loading screen is displayed instead 
const errorFlag = ref(false); // Trigger this when an error occures

// Function to fetch all pokemon data then call fetchEachData()
async function fetchAllData() {
    try {
        loading.value = true; // Reassign value just to be safe

        // Set the limit of how many pokemons to display in MainView.vue
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numOfPokemon}`);
        const data = await response.json();

        const promises = data.results.map(eachData => fetchEachData(eachData));
        await Promise.all(promises); // all.Promises() is used to ensure all data is fetch first
                                     // before continue with next line

        allPokemonData.value.sort((a,b) => a.id - b.id); // Sort the data as fetch is async hence 
                                                         // some data loaded out of order

        loading.value = false;
        // loading.value = false; // Reassign loading value to false to display the MainView.vue contents
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

// Search functionality for header in MainView.vue
const target = ref("");
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

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>