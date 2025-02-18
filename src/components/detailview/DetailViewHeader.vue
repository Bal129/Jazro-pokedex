<template>
    <!-- Display header for navigation including go back to home, next index, previous index -->
    <header class="py-2 fixed-top custom-top-pokeball custom-navbar-anim-top">
        <div class="container">
            <div class="row">
                <!-- Left side of header -->
                <!-- Button to route back to home -->
                <div class="col-6 d-flex justify-content-start align-items-center">
                    <RouterLink :to="{ name: 'main' }" style="text-decoration: none;" class="custom-button-hover">
                        <div class="row p-2">
                            <i 
                                class="text-center fa fa-home"
                                style="color: black"
                            ></i>
                        </div>
                        <div class="row" style="color:white;">
                            <small class="text-center text-">Home</small>
                        </div>
                    </RouterLink>
                </div>

                <!-- Right side of header -->
                <!-- Buttons to route previous or next index -->
                <div class="col-6 d-flex justify-content-end align-items-center">

                    <!-- Button to route to previous index -->
                    <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) - 1 } }" class="custom-button-hover">
                        <div v-if="props.id > 1" class="p-2">
                            <i 
                                class="fa fa-arrow-circle-left fa-2x"
                                style="color: black"
                            ></i>
                        </div>
                    </RouterLink>

                    <!-- Index of current pokemon in display -->
                    <div class="px-3">
                        <h1 style="color:white">#{{ props.id }}</h1>
                    </div>

                    <!-- Button to route to previous index -->
                    <RouterLink :to="{ name: 'detail', params: { id: Number(props.id) + 1 } }" class="custom-button-hover">
                        <div class="p-2">
                            <i 
                                class="fa fa-arrow-circle-right fa-2x"
                                style="color: black"
                            ></i>
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