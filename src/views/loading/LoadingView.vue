<template>
  <!-- A simple loading screen -->
  <div class="d-flex flex-column justify-content-between align-items-center">
    <!-- Top pokeball using custom-loading-top-pokeball class in custom.css -->
    <span class="c-top-pokeball-loading"></span>

    <!-- Middle content contains a text 'Loading' and a spinner -->
    <div class="d-flex justify-content-center align-items-center">
      <h4 class="display-4 fw-bold text-center p-2">Loading</h4>
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
    
    <!-- Bottom pokeball using custom-loading-bottom-pokeball class in custom.css -->
    <span class="c-bottom-pokeball-loading"></span>
  </div>
</template>