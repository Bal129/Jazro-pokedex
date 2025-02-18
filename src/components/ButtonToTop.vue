<template>
    <!-- A single section that stays at the bottom of the screen -->
    <section class="custom-bottom-pokeball fixed-bottom custom-navbar-anim-bottom">
        <div class="container d-flex justify-content-end">
            <!-- A custom button that move the user to the top -->
            <div 
                class="custom-btn-totop custom-to-top-anim"
                @click="scrollToTop"
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