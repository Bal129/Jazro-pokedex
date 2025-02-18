<template>
    <!-- To display basic info based on how many items passed as props -->
    <!-- As of now, the items are: Base Experience, Height(m), Weight(kg),   -->
    <!--                           Base Happiness, Capture Rate, Growth Rate -->
    <div>
        <ul 
            class="list-group d-flex justify-content-center"
        >
            <li 
                class="list-group-item d-flex justify-content-between"
                v-for="item in items" :key="item.header"
            >
                <!-- Each props items contain header and data to display -->
                <span class="my-auto">{{ item.header }}</span>
                <span class="border p-2 rounded"> {{ item.data }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
// Accept multiple values as props, each 'items' contains header and data
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
});
</script>