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
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>

        <editable-table
          v-else
          :fields="tableFields"
          :rows="tableRows"
          :aggregated-data="tableAggregations"
          @change="onChangeValue"
          @change-aggregating="onChangeAggregating"
          @add-row="onAddRow"
          @del-row="onDelRow"
          @add-col="onAddCol"
          @del-col="onDelCol"
        ></editable-table>
      </b-col>
    </b-row>

    <promt-name v-model="newColumn.name" @change="onEnterColumnName"></promt-name>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AppLogo from '~/components/app-logo.vue';
import PromtName from '~/components/promt-name.vue';
import EditableTable from '~/components/editable-table';

import { isNumber, isString, isCorrectUrl } from '~/helpers';

export default {
  components: {
    AppLogo,
    PromtName,
    EditableTable
  },
  data() {
    return {
      newColumn: {
        name: '',
        type: ''
      },
      isLoading: true
    }
  },
  async created() {
    try {
      const fieldResponse = await this.fieldRead();
      const dataResponse = await this.dataRead()

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
    onAddCol(type) {
      this.newColumn.name = '';
      this.newColumn.type = type;
      this.$bvModal.show('modal-promt-name');
    },
    async onDelCol(colName) {
      await this.fieldDelete({ name: colName });
    },
    async onEnterColumnName(caption) {
      const type = this.newColumn.type;
      const order = this.tableFields.length;

      await this.fieldCreate({
        caption,
        type,
        order,
        aggregate: (type === 'number') ? 'sum' : null
      });
    }
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
