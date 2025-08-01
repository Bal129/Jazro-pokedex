<template>
  <!-- Extra spacing for visual appeal -->
  <div class="row py-5"></div>
  <div class="row py-3">
    <!-- Text and intro for user -->
    <h1 class="text-center">
      Welcome
    </h1>
    <h6 class="text-muted text-center">
      This is a list of Pokemons from index 1 to {{ displayNum }}. <br/>
      Click on one of the Pokemons to view their details or search your 
      favorite Pokemon using the search functionality on top!
    </h6>
  </div>
    
  <!-- Extra spacing for visual -->
  <div class="row pb-5 mx-2">
    <i class="text-center fas fa-chevron-down fa-2x custom-floating"></i>
  </div>
</template>

<script setup>
const props = defineProps(["displayNum"]);
</script>