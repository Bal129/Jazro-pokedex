<template>
  <!-- Display header for navigation including go back to home, next index, previous index -->
  <header class="c-top-pokeball-main c-anim-navbar-top fixed-top py-2">
    <div class="container font-monospace">
      <div class="row">
        <!-- Left side of header -->
        <!-- Button to go back to home -->
        <div class="col-6 d-flex justify-content-start align-items-center">
          <RouterLink 
            :to="{ name: 'main' }" 
            class="c-btn-nav c-anim-to-home" 
            style="text-decoration: none;"
            title="Go to: Home"
          >
            <div class="row p-2">
              <i class="fa fa-home text-center"></i>
            </div>
            <div class="row">
              <small class="text-center">Home</small>
            </div>
          </RouterLink>
        </div>

        <!-- Right side of header -->
        <!-- Buttons to route previous or next index -->
        <div class="col-6 d-flex justify-content-end align-items-center">
          <!-- Button to route to previous index -->
          <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) - 1 } }">
            <div v-if="props.id > 1" class="p-2">
              <i
                :title="'Go to: Pokemon with id ' + (props.id - 1)"
                class="fa fa-arrow-circle-left fa-2x c-btn-nav c-anim-to-left">
              </i>
            </div>
          </RouterLink>

          <!-- Index of current pokemon in display -->
          <div class="px-3">
            <h1 class="text-light">#{{ props.id }}</h1>
          </div>

          <!-- Button to route to previous index -->
          <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) + 1 } }">
            <div class="p-2">
              <i
                :title="'Go to: Pokemon with id ' + (props.id + 1)"
                class="fa fa-arrow-circle-right fa-2x c-btn-nav c-anim-to-right">
              </i>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps(["id"]);
</script>