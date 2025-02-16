<template>
    <section class="bg-dark fixed-bottom">
        <div class="container d-flex">
            <button 
                class="btn text-light ms-auto" 
                @click="scrollToTop">
                To Top
            </button>
        </div>
    </section>
</template>

<script setup>
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>