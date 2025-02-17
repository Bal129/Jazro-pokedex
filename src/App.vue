<template>
    <!-- <RouterView /> -->
     
        <Suspense>
            <RouterView></RouterView>
            <template #fallback>
                Loading data...
            </template>
        </Suspense>
    

    <!-- <RouterView v-slot="{ Component }">
        {{ cacheComponent(Component) }}
        <template v-if="Component || CachedComponent">
            <Suspense>
                <component :is="Component || CachedComponent"></component>
                <template #fallback>
                    <div class="text-center mt-5">
                        <h2 id="test">Loading Pokémon Data...</h2>
                    </div>
                </template>
            </Suspense>
        </template>
    </RouterView> -->

    <!-- <RouterView v-slot="{ Component }">
        {{ cacheComponent(Component) }}
        <template v-if="Component || CachedComponent">
            <Suspense>
                <component :is="Component || CachedComponent"></component>
                <template #fallback>
                    <div class="text-center mt-5">
                        <h2 id="test">Loading Pokémon Data...</h2>
                    </div>
                </template>
            </Suspense>
        </template>
    </RouterView> -->

    <!-- <Suspense>
        <RouterView/>
        <template #fallback>
            <div class="text-center mt-5">
                <h2 id="test">Loading Pokémon Data...</h2>
            </div>
        </template>
    </Suspense> -->
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { ref, Suspense, onErrorCaptured } from 'vue';

// const CachedComponent = ref(null);
// function cacheComponent(Component) {
//   CachedComponent.value = Component || CachedComponent.value;
// }

</script>
