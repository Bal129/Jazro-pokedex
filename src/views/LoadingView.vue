<template>
    <!-- A simple loading screen -->
    <!-- Contains three parts: top Pokeball, middle content, bottom Pokeball -->
    <div class="row d-flex justify-content-center align-items-center">
        <!-- Top pokeball using custom-loading-top-pokeball class in custom.css -->
        <span class="custom-loading-top-pokeball" ></span>
        <!-- Middle content contains a text 'Loading' and a spinner -->
        <div class="d-flex justify-content-center align-items-center">
            <h1 class="p-2 text-center">Loading</h1>
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
        <!-- Bottom pokeball using custom-loading-bottom-pokeball class in custom.css -->
        <span class="custom-loading-bottom-pokeball" ></span>
    </div>
</template>