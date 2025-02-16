<template>
    <section class="custom-bottom-pokeball fixed-bottom">
        <div class="container d-flex">
            <button 
                class="border btn text-dark ms-auto p-2 m-2 bg-light" 
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