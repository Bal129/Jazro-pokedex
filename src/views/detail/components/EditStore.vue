<template>
  <div class="form-container">
    <!-- Form for users to edit store data -->
    <form>
      <!-- Loop through singleData to get all specific stats -->
      <!-- singleData is created to avoid repetition -->
      <h5 class="fw-bold py-3">General Information</h5>
      <div 
        v-for="(value, key) in singleData"
        :key="key"
        :class="styleRow"
      >
        <label 
          :for="`general-${key}`" 
          :class="styleLabel"
        > 
          {{ capitalizeUnderscore(key) }}
        </label>
        <div :class="styleCol">
          <input
            :id="`general-${key}`"
            :class="styleInput"
            type="text"
            :placeholder="capitalizeUnderscore(key)"
            v-model="pokemon[key]"
          />
        </div>
      </div>

      <!-- Labels to edit abilities data -->
      <h5 class="fw-bold py-3">Abilities</h5>
      <div 
        v-for="(abilities, aindex) in pokemon.abilities" 
        :key="aindex" 
        :class="styleRow"
      >
        <label 
          :for="`ability-name-${aindex}`" 
          :class="styleLabel"
        >
          Ability {{ aindex + 1 }} 
        </label>
        <div :class="styleCol">
          <input
            :id="`ability-name-${aindex}`"
            :class="styleInput"
            type="text"
            :placeholder="`Ability ${aindex+1} name`"
            v-model="pokemon.abilities[aindex].ability.name"
          />
          <input
            :id="`ability-hidden-${aindex}`"
            :class="styleInput"
            type="text"
            :placeholder="`Ability ${aindex+1} is hidden`"
            v-model="pokemon.abilities[aindex].is_hidden"
          />
        </div>
      </div>

      <!-- Labels to edit types data -->
      <h5 class="fw-bold py-3">Types</h5>
      <div 
        v-for="(types, tindex) in pokemon.types"
        :key="tindex"
        :class="styleRow"
      >
        <label 
          :for="`type-${tindex}`" 
          :class="styleLabel"
        > 
          Type {{ tindex + 1 }}
        </label>
        <div :class="styleCol">
          <input
            :id="`type-${tindex}`"
            :class="styleInput"
            type="text"
            :placeholder="`Type ${tindex+1}`"
            v-model="pokemon.types[tindex].type.name"
          />
        </div>
      </div>

      <!-- Labels to edit evolution data -->
      <!-- Including evolution name, types and sprite -->
      <h5 class="fw-bold py-3">Evolution</h5>
      <div 
        v-for="(chain, cindex) in pokemon.evolution_chain" 
        :key="cindex"
      >
        <h6 v-if="pokemon.evolution_chain.length > 1" class="text-center py-2">Evolution Chain {{ cindex + 1 }}</h6>
        <div 
          v-for="(evolution, eindex) in chain"
          :key="eindex"
          :class="styleRow"
        >
          <label 
            :for="`evolution-id-${eindex}`" 
            :class="styleLabel"
          > 
            Pokemon {{ eindex + 1 }} 
          </label>
          
          <div :class="styleCol">
            <!-- Id in evolution chain -->
            <input
              :id="`evolution-id-${eindex}`"
              :class="styleInput"
              type="text"
              :placeholder="`Pokemon ${eindex+1} id`"
              v-model="pokemon.evolution_chain[cindex][eindex].id"
            />

            <!-- Name in evolution chain -->
            <input
              :id="`evolution-name-${eindex}`"
              :class="styleInput"
              type="text"
              :placeholder="`Pokemon ${eindex+1} name`"
              v-model="pokemon.evolution_chain[cindex][eindex].name"
            />

            <!-- Types in evolution chain -->
            <div 
              v-for="(type, tindex) in evolution.types"
              :key="tindex"
            >
              <input
                :id="`evolution-type-${eindex}-${tindex}`"
                :class="styleInput"
                type="text"
                :placeholder="`Pokemon ${eindex+1} type ${tindex+1}`"
                v-model="pokemon.evolution_chain[cindex][eindex].types[tindex]"
              />
            </div>

            <!-- Sprite in evolution chain -->
            <input
              :id="`evolution-sprite-${eindex}`"
              :class="styleInput"
              type="text"
              :placeholder="`Pokemon ${eindex+1} sprite`"
              v-model="pokemon.evolution_chain[cindex][eindex].sprite"
            />
          </div>
        </div>
      </div>

      <!-- Labels to edit location data -->
       <!-- Including location name and its games -->
      <h5 class="fw-bold py-3">Locations</h5>
      <div 
        v-for="(location, lindex) in pokemon.location_info" 
        :key="lindex"
        :class="styleRow"
      >
        <label 
          :for="`location-name-${lindex}`"
          :class="styleLabel"
        > 
          Location {{ lindex + 1 }} 
        </label>
        
        <div :class="styleCol">
          <!-- Location name in location data -->
          <input
            :id="`location-name-${lindex}`"
            :class="styleInput"
            type="text"
            :placeholder="`Location ${lindex+1} name`"
            v-model="pokemon.location_info[lindex].locationName"
          />

          <!-- Games name in location data -->
          <div 
            v-for="(game, gindex) in location.gamesName"
            :key="gindex"
          >
            <input
              :id="`location-game-${lindex}-${gindex}`"
              :class="styleInput"
              type="text"
              :placeholder="`Location ${lindex+1} game ${gindex+1}`"
              v-model="pokemon.location_info[lindex].gamesName[gindex]"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { capitalizeUnderscore } from '@/utils/global';
import { ref, onMounted } from 'vue';
const props = defineProps(["pokemon"]);

const singleData = ref({
  id: 0,
  name: "Name",
  sprite: "Sprite",
  flavor_text: "Flavor Text",
  base_exp: 0,
  height: 0,
  weight: 0,
  base_happiness: 0,
  capture_rate: 0,
  growth_rate: "n/a",
});

onMounted(() => {
  singleData.value = {
    id: props.pokemon.id,
    name: props.pokemon.name,
    sprite: props.pokemon.sprite,
    flavor_text: props.pokemon.flavor_text,
    base_exp: props.pokemon.base_exp,
    height: props.pokemon.height,
    weight: props.pokemon.weight,
    base_happiness: props.pokemon.base_happiness,
    capture_rate: props.pokemon.capture_rate,
    growth_rate: props.pokemon.growth_rate,
  }
})

const styleRow = "row mb-2";
const styleLabel = "col-6 form-label";
const styleCol = "col-6";
const styleInput = "form-control";
</script>