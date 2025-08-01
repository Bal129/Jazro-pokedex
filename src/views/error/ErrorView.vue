<template>
  <!-- A simple error screen -->
  <div class="d-flex flex-column justify-content-between align-items-center">
    <!-- Top pokeball using custom-loading-top-pokeball class -->
    <span class="c-top-pokeball-loading c-top-pokeball-error"></span>

    <!-- Middle content contains a text 'Error' and an icon -->
    <h1 class="display-1 fw-bold text-center p-2">
      Error
      <span class="fa fa-exclamation-triangle"></span>
    </h1>

    <h6 class="text-center pb-2">
      Refer to console (Press F12)
    </h6>

    <!-- Bottom pokeball using custom-loading-bottom-pokeball class in -->
    <span class="c-bottom-pokeball-loading"></span>
  </div>
</template>