<template>
  <!-- Display this when Pokemon DOES contains location information -->
  <!-- propsAvailable set to 'true' if this Pokemon has location(s) -->
  <div 
    v-if="propsAvailable"
    class="table-responsive px-lg-5 px-xl-5"
  >
    <table 
      class="table table-white table-borderless rounded-4 table-hover text-center overflow-hidden"
    >
      <thead class="">
        <!-- Table headers -->
        <tr>
          <th class="text-center px-3 py-4" scope="col">
            Number
          </th>
          <th class="text-center px-3 py-4" scope="col">
            Location
          </th>
          <th class="text-center px-3 py-4" scope="col">
            Games
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in props.items" :key="index"
        >
          <!-- Table contents for each row -->
          <!-- Display the location first then its games -->
          <td class="text-muted text-center align-middle">
            {{ index + 1 }}
          </td>
          <td class="text-center align-middle">
            {{ capitalize(item.locationName) }}
          </td>
          <td>
            <div class="p-2 d-flex align-items-center">
              <!-- :class="'game-'.concat(game)" uses custom color -->
              <!-- for every game, refer to custom.css -->
              <span
                v-for="game in item.gamesName"
                class="fw-bold border rounded-4 py-2 px-3 mx-1" 
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
  <div v-else class="d-flex justify-content-center">
    <h6 
      class="border rounded text-center text-muted p-3 m-2"
    >
      No location data found
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