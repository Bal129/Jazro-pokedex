<template>
  <header class="c-top-pokeball-main c-anim-navbar-top fixed-top py-2">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- 'Pokedex' text just for visual appeal -->
      <h2 class="font-monospace text-light pt-2 pe-none">Pokedex</h2>
      <div class="input-group" style="max-width: 30%;">
        <!-- Search uses 'target' as a v-model -->
        <input 
          class="form-control"
          type="text" 
          placeholder="Search..."
          v-model="target"
        />
        <!-- Search icon just for visual appeal -->
        <span class="input-group-text">
          <i class="fas fa-search px-2"></i>
        </span>
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