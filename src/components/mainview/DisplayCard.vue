<template>
    <!-- Display the simplified Pokemon data using bootstrap card class -->
    <!-- Simplified data ('pokemon' props) contains index, name, sprite and types -->
    <div class="card m-2 custom-dcard custom-slide-up" v-if="props.pokemon" >
        <!-- Display Pokemon index (id) on top left -->
        <!-- cus-index class ensure that the position is always on top left -->
        <h3 class="cus-index m-2">
            #{{ props.pokemon.id }}
        </h3>

        <!-- Bootstrap card img top to display Pokemon sprite (only the front) -->
        <img
            class="card-img-top" 
            v-bind:src="props.pokemon.sprite"
            alt="Pokemon sprite"
        />

        <!-- Bootstrap card body to display Pokemon name and types -->
        <div class="card-body">
            <!-- Display Pokemon name -->
            <h3 class="card-title text-center py-1">
                <!-- Use my custom capitalize module to capitalize name -->
                {{ capitalize(props.pokemon.name) }}
            </h3>
            <!-- Display Pokemon types -->
            <!-- Some Pokemon have two types, need v-for -->
            <div>
                <ul 
                    class="list-group list-group-horizontal"
                >
                    <li 
                        class="list-group-item flex-fill text-center"
                        v-for="row in props.pokemon.types"
                        :class="'type-'.concat(row.type.name)"
                    >{{ capitalize(row.type.name) }}</li>
                    <!-- Use my custom capitalize module to capitalize types -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
// Import all necessary modules 
import { capitalize } from '@/utils/global.js'; // My custom module, for text capitalization

// 'pokemon' props that contains Pokemon index, name, sprite and types
const props = defineProps(["pokemon"]);
</script>

