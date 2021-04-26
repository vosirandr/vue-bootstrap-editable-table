<template>
  <t-data
    class="table-total-cell"
    :width="column.width"
  >
    <b v-if="column.id === firstColumnId">Total</b>

    <div v-else-if="hasAggregations">
      <span :class="!isAggregationValueValid && 'text-danger'">
        {{ formattedAggregationValue }}
      </span>

      <b-dropdown
        size="sm"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
        boundary="window"
      >
        <template v-slot:button-content>
          <i>{{ '[' + (aggregationName || '+') + ']' }}</i>
        </template>

        <b-dropdown-item
          v-for="aggregation in dropdownList"
          :key="aggregation"
          href="#"
          @click="onChange(aggregation, column.id)"
        >
          {{ aggregation || '-' }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </t-data>
</template>

<script>
import tData from './t-data';
import {Column} from '../../dto';
import ColumnService from '../../services/ColumnService';

export default {
  name: "t-total-cell",
  components: {
    tData
  },
  props: {
    column: {type: Column, required: true},
    rows: {type: Array, required: true},
    firstColumnId: {type: [String, Number], required: true},
  },
  computed: {
    values() {
      return this.rows.reduce((acc, row) => {
        acc.push(row.values[this.column.id]);
        return acc;
      }, []);
    },
    aggregationName() {
      return this.column.aggregate;
    },
    columnType() {
      return this.column.columnType;
    },
    hasAggregations() {
      return ColumnService.hasAggregations(this.column.type);
    },
    aggregationsService() {
      return ColumnService.aggregationsFactory(this.column, this.values);
    },
    aggregationValue() {
      if (!this.aggregationName) return null;
      return this.aggregationsService.aggregate(this.aggregationName);
    },
    formattedAggregationValue() {
      return this.aggregationsService.formatAggregatedValue(this.aggregationName, this.aggregationValue);
    },
    isAggregationValueValid() {
      return this.aggregationsService.isAggregatedValueValid(this.aggregationName, this.aggregationValue);
    },
    dropdownList() {
      return [null, ...this.aggregationsService.getAggregationNames()];
    },
  },
  mounted() {
    this.extractDropdownMenu();
  },
  methods: {
    extractDropdownMenu() {
      const dropdownMenu = this.$el.getElementsByClassName('dropdown-menu')[0];
      if (!dropdownMenu) return;
      document.body.append(dropdownMenu);
    },
    onChange(aggregation, id) {
      this.$emit('change-aggregating', {
        aggregation,
        id
      });
    },
  },
};
</script>

<style>
.table-total-cell .dropdown {
  vertical-align: baseline;
}

.table-total-cell .dropdown > button {
  padding: 1px;
}

.table-total-cell .dropdown-menu {
  max-height: 100px;
  overflow-y: auto;
}
</style>
