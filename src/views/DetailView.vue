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
                        <ul class="list-group ">
                            <li 
                                class="list-group-item text-center"
                                v-for="(row,index) in pokemonDetailedData.abilities"
                            >{{row.ability.name}}</li>
                        </ul>
                    </div>
                    <div class="row py-4"> <!-- basic info -->
                        <h4 class="text-muted">Basic Information</h4>
                        <ul class="list-group">
                            <li class="list-group-item">Base EXP</li>
                            <li class="list-group-item">Height</li>
                            <li class="list-group-item">Weight</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const pokemonDetailedData = ref({
    id: "0",
    name: "Name",
    sprite: "Sprite",
    types: {},
    abilities: {}
})

onMounted(() => {
    fetchData();
});

function fetchData() {
    fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => response.json())
    .then(data => {
        pokemonDetailedData.value = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types,
            abilities: data.abilities
        }
    })
    .catch(error => console.error("Error during fetch data: " + error));
}

</script>