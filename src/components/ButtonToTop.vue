<template>
  <!-- A single section that stays at the bottom of the screen -->
  <section class="c-bottom-pokeball-main fixed-bottom c-anim-navbar-bottom">
    <div class="container d-flex justify-content-end">
      <!-- A custom button that move the user to the top -->
      <div 
        class="c-btn-to-top c-anim-to-top"
        @click="scrollToTop"
        style="cursor: pointer;"
      >
        <i class="fas fa-arrow-circle-up"></i>
      </div>
    </div>
  </section>
</template>

<script setup>
// Use window.scrollTo() to move the user to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>