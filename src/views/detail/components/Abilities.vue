<template>
  <!-- Display abilities list -->
  <!-- Most Pokemon have more than one abilities so need v-for -->
  <div class="py-3">
    <ul 
      class="list-group d-flex justify-content-center"
    >
      <li 
        class="list-group-item text-center"
        v-for="row in props.abilities"
      >{{ capitalize(row.ability.name) }}</li>
    </ul>
  </div>
</template>

<script setup>
import { capitalize } from '@/utils/global'; // My custom module, for text capitalization

const props = defineProps({
  abilities: {
    type: Array,
  }
});
</script>