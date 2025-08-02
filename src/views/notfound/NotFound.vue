<template>
  <!-- A simple not found screen when the url is wrong -->
  <div 
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh;"
  >
    <div class="d-flex flex-column justify-content-center align-items-center">
      <!-- Top pokeball using custom-loading-top-pokeball class in custom.css -->
      <span class="c-top-pokeball-loading c-top-pokeball-error"></span>
      
      <!-- Middle content contains a text '404' and a button to main page -->
      <h1 class="display-1 fw-bold text-center p-2">
        404 Not Found!
      </h1>

      <RouterLink 
        :to="{ name: 'main' }"
        class="d-flex justify-content-center align-items-center"
        style="text-decoration: none;"
      >
        <h5 class="c-btn-to-top small text-light px-5 py-4">
          Home
          <i class="fa fa-home ps-2"></i>
        </h5>
      </RouterLink>

      <!-- Bottom pokeball using custom-loading-bottom-pokeball class in custom.css -->
      <span class="c-bottom-pokeball-loading" ></span>
    </div>
  </div>
</template>