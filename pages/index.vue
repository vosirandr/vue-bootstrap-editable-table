<template>
  <b-container>
    <b-row>
      <b-col>
        <app-logo/>
        <h1 class="title">
          vue-table
        </h1>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div v-if="isLoading" class="text-center">
          <b-spinner variant="primary" label="Text Centered" />
        </div>

        <editable-table
          v-else
          :fields="tableFields"
          :rows="tableRows"
          :aggregated-data="tableAggregations"
          :column-types="columnTypes"
          @change="onChangeValue"
          @change-aggregating="onChangeAggregating"
          @add-row="onAddRow"
          @del-row="onDelRow"
          @add-col="onAddCol"
          @del-col="onDelCol"
        />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AppLogo from '~/components/app-logo.vue';
import EditableTable from '../components/editable-table';

import DateColumnType from "../components/editable-table/column-types/DateColumnType";
import JsonColumnType from "../components/editable-table/column-types/JsonColumnType";
import ImageColumnType from "../components/editable-table/column-types/ImageColumnType";
import NumberColumnType from "../components/editable-table/column-types/NumberColumnType";
import PercentColumnType from "../components/editable-table/column-types/PercentColumnType";
import TextColumnType from "../components/editable-table/column-types/TextColumnType";

export default {
  components: {
    AppLogo,
    EditableTable
  },
  data() {
    return {
      columnTypes: [
        TextColumnType,
        ImageColumnType,
        NumberColumnType,
        DateColumnType,
        PercentColumnType,
        JsonColumnType,
      ],
      isLoading: true
    }
  },
  async created() {
    try {
      const fieldResponse = await this.fieldRead();
      const dataResponse = await this.dataRead();

      if (fieldResponse === 'Ok' && dataResponse === 'Ok') {
        this.isLoading = false;
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    ...mapGetters({
      tableFields: 'fieldTable/items',
      tableRows: 'dataTable/items',
      tableAggregations: 'dataTable/aggregations'
    }),
  },
  methods: {
    ...mapActions({
      fieldCreate: 'fieldTable/create',
      fieldRead: 'fieldTable/read',
      fieldUpdate: 'fieldTable/update',
      fieldDelete: 'fieldTable/delete',
      dataCreate: 'dataTable/create',
      dataRead: 'dataTable/read',
      dataUpdate: 'dataTable/update',
      dataDelete: 'dataTable/delete'
    }),
    async onAddRow() {
      await this.dataCreate();
    },
    async onDelRow(rowName) {
      await this.dataDelete({ name: rowName });
    },
    async onChangeValue({ fieldName, rowName, value }) {
      await this.dataUpdate({ fieldName, rowName, value });
    },
    async onChangeAggregating({ aggregation, fieldName }) {
      await this.fieldUpdate({
        fieldName: 'aggregate',
        rowName: fieldName,
        value: aggregation
      });
    },
    async onAddCol({ type, name }) {
      const order = this.tableFields.length;

      await this.fieldCreate({
        caption: name,
        type,
        order,
        aggregate: null
      });
    },
    async onDelCol(colName) {
      await this.fieldDelete({ name: colName });
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
