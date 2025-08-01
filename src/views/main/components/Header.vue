<template>
  <header class="py-2 fixed-top custom-top-pokeball custom-navbar-anim-top">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- 'Pokedex' text just for visual appeal -->
      <h2 class="text-light">Pokedex</h2>
      <div>
        <!-- Search uses 'target' as a v-model -->
        <input 
          class="border rounded px-3"
          type="text" 
          placeholder="Search..."
          v-model="target"
        />
        <!-- Search icon just for visual appeal -->
        <i class="fas fa-search px-2"></i>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(["update-target"]);
const target = ref("");

watch(target, (newTarget) => {
  emit("update-target", newTarget);
});

</script>