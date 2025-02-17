<template>
    <div>
        <ul class="list-group d-flex justify-content-center">
            <li 
                class="list-group-item d-flex justify-content-between"
                
                v-for="item in items" :key="item.header"
                >
                <span class="my-auto">
                    {{ item.header }}
                </span>
                <span class="border p-2 rounded"> 
                    {{ item.data }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
</script>