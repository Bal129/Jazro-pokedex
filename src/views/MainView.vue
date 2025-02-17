<template>

    <header class="py-2 fixed-top custom-top-pokeball" id="navbarHeader">
        <div class="container d-flex justify-content-between ">
            <h2 class="text-light">Pokedex</h2>
            <input type="text" placeholder="Search..." v-model="target"/>
        </div>
    </header>
        
    <section>
        <div class="container bg-light">
            <div class="row py-5"></div>
            <div class="row py-3">
                <h1 class="text-center">Welcome</h1>
                <h6 
                    class="text-muted text-center"
                >
                    This is a list of Pokemons from index 1 to {{numOfPokemon}}. <br/>
                    Click on one of the Pokemons to view their details or search your favorite Pokemon using the search functionality on top!
                </h6>
            </div>
            <div class="row py-3">
                <div  
                    class="col-12 col-md-6 col-lg-3"
                    v-for="pokemon in searchPokemon" :key="pokemon.id"
                >
                    <RouterLink :to="{ name: 'detail', params: { id: pokemon.id } }">
                        <DisplayCard 
                            :pokemon="pokemon"
                        />
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

    <footer class="pb-4">
        <div class="bg-dark text-muted">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <p class="text-light p-4">
                        This is a small project created by 
                        <i>Ahmad Iqbal Bin Che Shamshudin</i>
                        for <i>Jazari Robot Resources Front-End Challenges</i>
                        Visit my <a href="https://github.com/Bal129">Github</a> for more projects
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <ButtonToTop />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DisplayCard from "../components/DisplayCard.vue";
import ButtonToTop from "@/components/ButtonToTop.vue";

const numOfPokemon = 100;

const allPokemonData = ref([]);
const pokemonData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {}
});

async function fetchAllData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numOfPokemon}`);
        const data = await response.json();

        const promises = data.results.map(eachData => fetchEachData(eachData));
        await Promise.all(promises);

        allPokemonData.value.sort((a,b) => a.id - b.id);

        // return new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.error("Error during fetch all data: " + error);
    }
}

async function fetchEachData(eachData) {
    let link = eachData.url;

    try {
        const eachReponses = await fetch(link);
        const eachData = await eachReponses.json();

        allPokemonData.value.push({
            id: eachData.id,
            name: eachData.name,
            sprite: eachData.sprites.front_default,
            types: eachData.types      
        });        
    } catch (error) {
        console.error("Error during fetch each data: " + error);
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

const target = ref("");
const searchPokemon = computed(() => {
    return allPokemonData.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(target.value.toLowerCase())
    );
});

await fetchAllData();

</script>