<template>
  <div class="tr table-total">
    <t-total-column
      v-for="column in columns"
      :key="column.name"
      :column="column"
      @change-aggregating="$emit('change-aggregating', $event)"
    />

    <t-data empty/>
  </div>
</template>

<script>
import tData from './t-data.vue'
import TTotalColumn from "./t-total-column";

export default {
  name: 't-total',
  components: {
    TTotalColumn,
    tData
  },
  props: {
    columns: Array,
  },
}
</script>

<style>
  .table-total {
    min-height: 2rem;
  }
</style>
