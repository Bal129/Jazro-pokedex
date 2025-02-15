<template>
    <div class="card m-2">
        <h3 class="cus-index m-2">
            #{{ cardData.id }}
        </h3>
        <img 
            class="card-img-top" 
            v-bind:src="cardData.sprite"
            alt="Pokemon sprite"
        />
        <div class="card-body">
            <h3 class="card-title text-center py-1">
                {{cardData.name}}
            </h3>
            <div>
                <ul 
                    class="list-group list-group-horizontal"
                >
                    <li 
                        class="list-group-item flex-fill text-center"
                        v-for="row in cardData.types"
                    >{{ row.type.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
// import { useCounterStore } from '@/stores/counter';
const props = defineProps(["id"]);
// const pokemonId = 1;
// const storeCounter = useCounterStore();
const cardData = ref({
    id:0,
    name:"pokemon",
    sprite: "n/a",
    types: {},
});

onMounted(() => {
    fetchData(props.id);
});

function fetchData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
        cardData.value = {
            id: data.id,
            name: capitalize(data.name),
            sprite: data.sprites.front_default,
            types: data.types
        }
        console.log(cardData.value);
    })
    .catch(error => console.error(error));
}

// function storeData(data) {
//     // console.log(data);
//     // console.log(data.species);
//     storeCounter.id = data.id;
//     storeCounter.name = capitalize(data.name);
//     storeCounter.sprites = data.sprites;
//     storeCounter.types = data.types;
//     storeCounter.height = data.height;
//     storeCounter.weight = data.weight;
//     storeCounter.abilities = data.abilities;
//     storeCounter.base_experience = data.c;
//     storeCounter.locations = data.locations;
// }

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

</script>

<style scoped>
.cus-index {
    position: absolute;
}
</style>