<template>

    <!-- Display this when Pokemon DOES contains location information -->
    <!-- propsAvailable set to 'true' if this Pokemon has location(s) -->
    <div 
        v-if="propsAvailable"
        class="table-responsive py-2 px-lg-5 px-xl-5"
    >
        <table 
            class="table table-striped table-bordered table-hover text-center"
        >
            <thead class="table-dark">
                <!-- Table headers -->
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
                    <!-- Table contents for each row -->
                    <!-- Display the location first then its games -->
                    <td class="text-center" style="width: 10%">{{ index + 1 }}</td>
                    <td style="width: 40%">
                        {{ capitalize(item.locationName) }}
                    </td>
                    <td style="width: 50%">
                        <div class="p-2 d-flex align-items-center">
                            <!-- :class="'game-'.concat(game)" uses custom color -->
                            <!-- for every game, refer to custom.css -->
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

    <!-- Display this when Pokemon DOES NOT contains location information -->
    <div v-else class="w-50">
        <h6 
            class="border rounded text-center text-muted p-3 m-2"
        >
            No data
        </h6>
    </div>
</template>

<script setup>
// Import all necessary modules
import { ref, onMounted } from 'vue';
import { capitalize } from '@/utils/global'; // My custom module, for text capitalization

// 'items' contains location name and its games
const props = defineProps(["items"]);
const propsAvailable = ref(false);

// Check to make sure items contains at least one data, if not, show 'No data'
onMounted(() => {
    if (props.items.length > 1) {
        propsAvailable.value = true;
    }
})

</script>