<template>
  <div class="tr table-total">
    <t-data v-for="column in columns" :key="column.name" :grow="column.grow">
      <b v-if="column.name === 'name'">Total</b>

      <div v-else-if="hasAggregate(column)">
        {{ column.aggregate && formatValue(aggregate(column))}}

        <b-dropdown
          size="sm"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template v-slot:button-content>
            <i>{{'['+(column.aggregate || '+')+']'}}</i>
          </template>

          <b-dropdown-item
            v-for="aggregation in getDropdownList(column)"
            :key="aggregation"
            href="#"
            @click="onChange(aggregation, column.name)"
          >
            {{ aggregation || '-' }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </t-data>

    <t-data empty/>
  </div>
</template>

<script>
import tData from './t-data.vue'
import { formatFloat } from '~/helpers'

export default {
  name: 't-total',
  components: {
    tData
  },
  props: {
    columns: Array,
  },
  inject: ['getColumnType'],
  methods: {
    hasAggregate (column) {
      const columnType = this.getColumnType(column.type);
      return columnType.aggregations.length;
    },
    aggregate (column) {
      const aggregationName = column.aggregate;
      return column.columnType.aggregate(aggregationName, column.values);
    },
    formatValue(value) {
      return formatFloat(value);
    },
    getDropdownList (column) {
      return [null, ...column.columnType.getAggregationNames()];
    },
    onChange(func, fieldName) {
      this.$emit('change-aggregating', {
        aggregation: func,
        fieldName
      });
    },
  }
}
</script>

<style>
  .table-total {
    min-height: 2rem;
  }

  .table-total .dropdown {
    vertical-align: baseline;
  }

  .table-total .dropdown>button {
    padding: 1px;
  }
</style>
