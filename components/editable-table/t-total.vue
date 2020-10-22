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

          <b-dropdown-item href="#" @click="onChange(null, column.name)">-</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('sum', column.name)">sum</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('mean', column.name)">mean</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('median', column.name)">median</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('min', column.name)">min</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('max', column.name)">max</b-dropdown-item>
          <b-dropdown-item href="#" @click="onChange('count', column.name)">count</b-dropdown-item>
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
      const aggregationMethod = column.columnType.getAggregationMethod(aggregationName);
      if (!aggregationMethod) return null;
      return aggregationMethod(column.values);
    },
    formatValue(value) {
      return formatFloat(value);
    },
    onChange(func, fieldName) {
      this.$emit('change-aggregating', {
        aggregation: func,
        fieldName
      });
    }
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
