<template>
  <div class="tr b-editable-table-total">
    <t-total-cell
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :rows="rows"
      :first-column-id="firstColumnId"
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
    columns: {type: Array, required: true},
    rows: {type: Array, required: true},
    firstColumnId: {type: [String, Number], required: true},
  },
};
</script>

<style>
.b-editable-table-total {
  min-height: 2rem;
}
</style>
