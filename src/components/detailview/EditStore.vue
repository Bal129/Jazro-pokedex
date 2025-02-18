<template>
    <div class="form-container">
        <!-- Form for users to edit store data -->
        <form>
            <!-- Loop through singleData to get all specific stats -->
            <!-- singleData is created to avoid repetition -->
            <div v-for="(value, key) in singleData" :key="key" :class="styleRow">
                <label :for="key" :class="styleLabel"> {{ capitalizeUnderscore(key) }} </label>
                <div :class="styleCol">
                    <input
                        :id="key"
                        :class="styleInput"
                        type="text"
                        :placeholder="key" 
                        v-model="pokemon[key]"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { capitalize, capitalizeUnderscore } from '@/utils/global';
import { ref, onMounted } from 'vue';
const props = defineProps(["pokemon"]);

const singleData = ref({
    id: 0,
    name: "Name",
    sprite: "Sprite",
    color: "black",
    flavor_text: "Flavor Text",
    base_exp: 0,
    height: 0,
    weight: 0,
    base_happiness: 0,
    capture_rate: 0,
    growth_rate: "n/a",
    locations_url: "",
});

onMounted(() => {
    singleData.value = {
        id: props.pokemon.id,
        name: props.pokemon.name,
        sprite: props.pokemon.sprite,
        color: props.pokemon.color,
        base_exp: props.pokemon.base_exp,
        height: props.pokemon.height,
        weight: props.pokemon.weight,
        base_happiness: props.pokemon.base_happiness,
        capture_rate: props.pokemon.capture_rate,
        growth_rate: props.pokemon.growth_rate,
        locations_url: props.pokemon.locations_url
    }
})

const styleRow = "row mb-2";
const styleLabel = "col-6 form-label";
const styleCol = "col-6";
const styleInput = "form-control";
</script>