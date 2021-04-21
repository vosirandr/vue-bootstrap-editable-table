<template>
  <div class="tr table-total">
    <t-total-cell
      v-for="column in columns"
      :key="column.name"
      :column="column"
      @change-aggregating="$emit('change-aggregating', $event)"
    />

    <t-data empty/>
  </div>
</template>

<script>
import tData from './t-data.vue';
import TTotalCell from './t-total-cell';

export default {
  name: 't-total',
  components: {
    TTotalCell,
    tData
  },
  props: {
    columns: Array,
  },
};
</script>

<style>
  .table-total {
    min-height: 2rem;
  }
</style>
