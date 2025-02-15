<template>
    <header class="py-2 bg-dark fixed-top" id="navbarHeader">
		<div class="container d-flex justify-content-between">
			<h2 class="text-light">Pokedex</h2>
            <input type="text" placeholder="Search..." v-model="target"/>
			
			<!-- <div class="row">
				<div class="col-4">
					<h2 class="text-light">Logo</h2>
				</div>
				<div class="col-8">
					<h2 class="text-light float-right">Search Bar</h2>
				</div>
			</div> -->
		</div>
	</header>
    
    <section>
        <div class="container bg-light">
            <div class="row py-5" id="topAnchor"></div>
            <div class="row py-3">
                <h1 class="text-center">Welcome</h1>
                <h3 class="text-muted text-center">This is a list of Pokemons from index 1 to {{numOfPokemon}}</h3>
            </div>
            <div class="row py-3">
                <div  
                    class="col-12 col-md-6 col-lg-3"
                    v-for="pokemon in searchPokemon" :key="pokemon.id"
                >
                    <DisplayCard 
                        :pokemon="pokemon"
                    />
                </div>
            </div>
            <!-- <ul class="list-group">
                <li  
                    class="list-group"
                    v-for="pokemon in searchPokemon" :key="pokemon.id"
                >
                    <DisplayCard 
                        :pokemon="pokemon"
                    />
                </li>
            </ul> -->
        </div>
    </section>

    <section class="bg-dark fixed-bottom">
        <div class="container d-flex">
            <a class="btn text-light  ms-auto" href="#topAnchor">
                To Top
            </a>
        </div>
    </section>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DisplayCard from "../components/DisplayCard.vue";

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
        Promise.all(promises);

        // allData.results.forEach(eachData => {
        //     fetchEachData(eachData)
        // })
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
        }
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