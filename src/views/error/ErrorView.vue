<template>
    <!-- A simple error screen -->
    <!-- Contains three parts: top Pokeball, middle content, bottom Pokeball -->
    <div class="row d-flex justify-content-center align-items-center">
        <!-- Top pokeball using custom-loading-top-pokeball class in custom.css -->
        <span 
            class="custom-loading-top-pokeball" 
            style="transform: translateX(100px) translateY(-70px) rotate(45deg);"
        >
        </span>
        <!-- Middle content contains a text 'Error' and an icon -->
        <div class="d-flex justify-content-center align-items-center">
            <h1 class="p-2 text-center">Error, refer to console</h1>
            <i class="fa fa-exclamation-triangle fa-3x fa-fw"></i>
        </div>
        <!-- Bottom pokeball using custom-loading-bottom-pokeball class in custom.css -->
        <span class="custom-loading-bottom-pokeball" ></span>
    </div>
</template>