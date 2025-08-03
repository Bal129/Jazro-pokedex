<template>
  <!-- A single section that stays at the bottom of the screen -->
  <section class="c-bottom-pokeball-main fixed-bottom c-anim-navbar-bottom">
    <div class="container d-flex justify-content-between">
      <div
        class="d-flex align-items-center gap-1"
        style="transform: translateY(-10px);"
      >
        <span class="font-monospace">Theme:</span>
        <button class="c-btn-theme c-btn-pokeball" @click="changeTheme('pokeball')" />
        <button class="c-btn-theme c-btn-greatball" @click="changeTheme('greatball')" />
        <button class="c-btn-theme c-btn-ultraball" @click="changeTheme('ultraball')" />
        <button class="c-btn-theme c-btn-masterball" @click="changeTheme('masterball')" />
      </div>
      <!-- A custom button that move the user to the top -->
      <div 
        class="c-btn-to-top c-anim-to-top"
        @click="scrollToTop"
        style="cursor: pointer;"
        title="Go to: Top of the page"
      >
        <span class="small">Top</span>
        <i class="fas fa-arrow-circle-up ps-2"></i>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Use window.scrollTo() to move the user to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const { theme, changeTheme } = useTheme();


</script>