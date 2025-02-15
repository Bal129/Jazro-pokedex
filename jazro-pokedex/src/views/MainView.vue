<template>
    <h1>Creating the display card...</h1>
    <ul>
        <li v-for="row in rows" :key="row">
            <DisplayCard :id="row.toString()"/>
        </li>
    </ul>
    
</template>

<script setup>
import DisplayCard from "../components/DisplayCard.vue";

const rows = 100;

</script>