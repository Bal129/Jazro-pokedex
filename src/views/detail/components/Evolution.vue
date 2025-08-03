<template>
  <!-- Display this when Pokemon DOES contains evolution information -->
  <!-- propsAvailable set to 'true' if this Pokemon has evolution(s) -->
  <div
    v-if="propsAvailable"
    class="table-responsive p-5"
  >
    <table 
      class="mx-auto"
    >
      <tbody>
        <tr v-for="(chain, cindex) in props.chains">
          <!-- Only show the indexing if the evolution chain is more than 1 -->
          <td v-if="props.chains.length > 1" class="text-center" style="max-width:10%">
            {{ (cindex + 1) }}
          </td>
          <!-- Contents for the evolution chain -->
          <td v-for="(pokemon, pindex) in chain">
            <RouterLink 
              :to="{ name: 'detail', params: { id: pokemon.id } }"
              class="text-decoration-none text-dark"
              :title="'Go to: Pokemon with id ' + pokemon.id"
            >
              <div class="c-dcard-img d-flex flex-column align-items-center gap-2 flex-wrap p-3">
                <img :src="pokemon.sprite" class="img-fluid"/>
                <div class="fw-bold text-center">{{ capitalize(pokemon.name )}}</div>
                <div class="d-flex justify-content-center gap-1">
                  <span
                    v-for="(type, tindex) in pokemon.types"
                    :key="tindex"
                    class="rounded px-2 py-1"
                    :class="'type-'.concat(type)"
                  >
                    {{ capitalize(type) }}
                  </span>
                </div>
              </div>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Display this when Pokemon DOES NOT contains evolution information -->
  <div v-else class="d-flex justify-content-center">
    <h6 
      class="border rounded text-center text-muted p-3 m-2"
    >
      No recorded evolution chain
    </h6>
  </div>
</template>

<script setup>
// Import all necessary modules
import { onMounted, ref } from 'vue';
import { capitalize } from '@/utils/global';

// 'chains' contains pokemon name, types, sprites and its evolution chain
const props = defineProps(["chains"]);
const propsAvailable = ref(false);

// Check to make sure chains contains at least one data, if not, show 'No data'
onMounted(() => {
  try {
    if (props.chains.length >= 1) propsAvailable.value = true;
  } catch(error) {
    console.log(error);
    propsAvailable.value = false;
  }
})
</script>