<template>
  <!-- Display sprite -->
  <div class="row m-1 p-4">
    <img class="border rounded bg-light"
      v-bind:src="props.sprite" 
      alt="Sprite" 
    />
  </div>

  <!-- Display flavor text -->
  <div class="row"> 
    <p class="lead text-muted py-3 text-center">
      {{ props.flavor_text }}
    </p>
  </div>
  
  <!-- Display types -->
  <!-- Some Pokemon has more than one type, so need to v-for every types -->
  <div class="row">
    <ul class="list-group list-group-horizontal d-flex justify-content-center">
      <!-- 'type-'.concat(row.type.name) refers to custom styling for each types -->
      <!-- Refer to custom.css for more details -->
      <li 
        class="fw-bold list-group-item text-center"
        v-for="row in props.types"
        :class="'type-'.concat(row.type.name)"
      >
        {{ capitalize(row.type.name) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { capitalize } from '@/utils/global'; // My custom module, for text capitalization

const props = defineProps({
  color: String,
  sprite: String,
  flavor_text: String,
  types: {
    type: Array
  }
});
</script>