<template>
    <div 
        class="d-flex justify-content-center align-items-center"
        style="height: 100vh;"
    >
        <!-- A simple not found screen -->
        <!-- Contains three parts: top Pokeball, middle content, bottom Pokeball -->
        <div class="row d-flex justify-content-center align-items-center">
            <!-- Top pokeball using custom-loading-top-pokeball class in custom.css -->
            <span 
                class="custom-loading-top-pokeball"
                style="transform: translateX(100px) translateY(-70px) rotate(45deg);"
            >
            </span>
            <!-- Middle content contains a text '404' and a button to main page -->
            <div class="d-flex justify-content-center align-items-center">
                <h1 class="p-2 text-center">404 Not Found!</h1>
                <RouterLink :to="{ name: 'main' }">
                    <h3 class="btn btn-dark p-2 text-center">Main Page</h3>
                </RouterLink>
            </div>
            <!-- Bottom pokeball using custom-loading-bottom-pokeball class in custom.css -->
            <span class="custom-loading-bottom-pokeball" ></span>
        </div>
    </div>
    
</template>

<script setup>
</script>