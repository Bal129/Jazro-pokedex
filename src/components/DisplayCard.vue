<template>
    <div class="card m-2">
        <h3 class="cus-index m-2">
            #{{ props.pokemon.id }}
        </h3>
        <img 
            class="card-img-top" 
            v-bind:src="props.pokemon.sprite"
            alt="Pokemon sprite"
        />
        <div class="card-body">
            <h3 class="card-title text-center py-1">
                {{props.pokemon.name}}
            </h3>
            <div>
                <ul 
                    class="list-group list-group-horizontal"
                >
                    <li 
                        class="list-group-item flex-fill text-center"
                        v-for="row in props.pokemon.types"
                        :class="'type-'.concat(row.type.name)"
                    >{{ capitalize(row.type.name) }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["pokemon"]);

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

</script>

<style scoped>
.cus-index {
    position: absolute;
}
</style>