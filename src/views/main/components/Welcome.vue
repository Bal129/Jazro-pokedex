<template>
  <!-- Extra spacing for visual appeal -->
  <div class="row py-5"></div>
  <div class="row py-3">
    <!-- Text and intro for user -->
    <h3 class="display-3 fw-bold text-center text-dark">
      Welcome, Trainer!
    </h3>
    <h6 class="font-monospace fw-bold text-center text-muted py-3">
      This is a list of Pokemons from index 1 to {{ displayNum }}.
      Click on one of the Pokemons to view their details or search your 
      favorite Pokemon using the search functionality on top!
    </h6>
  </div>
    
  <!-- Extra spacing for visual -->
  <div class="row pb-5 mx-2">
    <i class="c-anim-floating text-center text-muted fas fa-chevron-down fa-2x"></i>
  </div>
</template>

<script setup>
const props = defineProps(["displayNum"]);
</script>