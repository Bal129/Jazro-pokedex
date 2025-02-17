<template>
    <div class="table-responsive py-2 px-lg-5 px-xl-5">
        <table class="table border">
            <thead>
                <tr>
                    <th class="text-center" scope="col">No</th>
                    <th class="text-center" scope="col">Location</th>
                    <th class="text-center" scope="col">Games</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in props.items" :key="index"
                >
                    <td class="text-center" style="width: 10%">{{ index + 1 }}</td>
                    <td style="width: 40%">
                        {{ capitalize(item.locationName) }}
                    </td>
                    <td style="width: 50%">
                        <div class="p-2 d-flex align-items-center">
                            <span
                                v-for="game in item.gamesName"
                                class="border rounded p-2" 
                                :class="'game-'.concat(game)"
                            >
                                {{ capitalize(game) }}
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { capitalize } from '@/utils/global';

const props = defineProps(["items"]);

onMounted(() => {
    console.log(props.items)
})

</script>