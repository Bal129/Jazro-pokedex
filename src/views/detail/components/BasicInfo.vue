<template>
  <!-- To display basic info based on how many items passed as props -->
  <!-- As of now, the items are: Base Experience, Height(m), Weight(kg),   -->
  <!--                           Base Happiness, Capture Rate, Growth Rate -->
  <div class="p-3">
    <table class="table table-borderless table-hover align-middle rounded shadow-sm overflow-hidden">
      <tbody>
        <tr v-for="item in items" :key="item.header">
          <td class="text-center text-muted px-3"><i :class="item.icon"></i></td>
          <td class="fw-semibold text-dark px-3">{{ item.header }}</td>
          <td class="text-center fw-medium px-3">{{ item.data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Accept multiple values as props, each 'items' contains header and data
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
});

</script>