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
      >
        {{ capitalize(row.ability.name) }}
        <i v-if="!row.is_hidden"></i>
        <i 
          v-else class="fa fa-eye-slash"
          title="Ability is hidden"
          style="cursor: pointer;"
        >
        </i>
      </li>
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