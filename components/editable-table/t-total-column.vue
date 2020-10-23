<template>
  <t-data
    class="table-total-column"
    :grow="column.grow"
  >
    <b v-if="column.name === 'name'">Total</b>

    <div v-else-if="hasAggregations">
      <span :class="!isAggregationValueValid && 'text-danger'">
        {{ formattedAggregationValue}}
      </span>

      <b-dropdown
        size="sm"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
      >
        <template v-slot:button-content>
          <i>{{'['+(aggregationName || '+')+']'}}</i>
        </template>

        <b-dropdown-item
          v-for="aggregation in dropdownList"
          :key="aggregation"
          href="#"
          @click="onChange(aggregation, column.name)"
        >
          {{ aggregation || '-' }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </t-data>
</template>

<script>
  import tData from './t-data';

  export default {
    name: "t-total-column",
    components: {
      tData
    },
    props: {
      column: Object,
    },
    computed: {
      aggregationName () {
        return this.column.aggregate;
      },
      columnType () {
        return this.column.columnType;
      },
      hasAggregations () {
        return this.columnType.hasAggregations();
      },
      aggregationValue () {
        if (!this.aggregationName) return null;
        return this.columnType.aggregate(this.aggregationName, this.column.values);
      },
      formattedAggregationValue () {
        return this.columnType.formatAggregatedValue(this.aggregationName, this.aggregationValue);
      },
      isAggregationValueValid () {
        return this.columnType.isAggregatedValueValid(this.aggregationName, this.aggregationValue);
      },
      dropdownList () {
        return [null, ...this.columnType.getAggregationNames()];
      },
    },
    methods: {
      onChange(aggregation, fieldName) {
        this.$emit('change-aggregating', {
          aggregation,
          fieldName
        });
      },
    }
  }
</script>

<style>
  .table-total-column .dropdown {
    vertical-align: baseline;
  }

  .table-total-column .dropdown>button {
    padding: 1px;
  }
</style>
