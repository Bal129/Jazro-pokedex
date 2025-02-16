<template>
    <header class="py-2 bg-dark fixed-top" id="navbarHeader">
		<div class="container d-flex justify-content-between">
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
                    Press one of the Pokemon to view their details or search your favorite Pokemon using the search functionality on top!
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

onMounted(() => {
    fetchAllData();
});

function fetchAllData() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numOfPokemon}`)
    .then(response => response.json())
    .then(allData => {
        const promises = allData.results.map(eachData => 
            fetchEachData(eachData)
        );
        Promise.all(promises).then(() => {
            allPokemonData.value.sort((a,b) => a.id - b.id);
        });
    })
    .catch(error => console.error("Error during fetch all data: " + error));
}

function fetchEachData(eachData) {
    let link = eachData.url;

    return fetch(link)
    .then(response => response.json())
    .then(data => {
        pokemonData.value = {
            id: data.id,
            name: capitalize(data.name),
            sprite: data.sprites.front_default,
            types: data.types
        };
        allPokemonData.value.push(pokemonData.value);
    })
    .catch(error => console.error("Error during fetch each data: " + error));
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



</script>