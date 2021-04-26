<template>
  <b-container>
    <b-row>
      <b-col>
        <div v-if="isLoading" class="text-center">
          <b-spinner variant="primary" label="Text Centered"/>
        </div>

        <table-switcher
          v-else
          :fields="tableFields"
          :rows="tableRows"
          :cell-editor-component="cellEditorComponent"
          height="500px"
          @change="onChangeValue"
          @change-aggregating="onChangeAggregating"
          @add-row="onAddRow"
          @del-row="onDelRow"
          @add-col="onAddCol"
          @del-col="onDelCol"
          @resize-col="onResizeCol"
          @move-col="onMoveCol"
          @move-row="onMoveRow"
          @update-cells="onUpdateCells"
          @rename-col="onRenameCol"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import TableSwitcher from '../components/table-switcher';
import COLUMN_TYPES from '../../src/services/column-types';
import JsonEditor from '../components/json-editor';

export default {
  components: {
    TableSwitcher,
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapGetters({
      tableFields: 'fieldTable/items',
      tableRows: 'dataTable/items',
    }),
  },
  async created() {
    try {
      const fieldResponse = await this.fieldRead();
      const dataResponse = await this.dataRead();

      if (fieldResponse === 'Ok' && dataResponse === 'Ok') {
        this.isLoading = false;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  },
  methods: {
    ...mapActions({
      fieldCreate: 'fieldTable/create',
      fieldRead: 'fieldTable/read',
      fieldUpdate: 'fieldTable/update',
      fieldDelete: 'fieldTable/delete',
      fieldResize: 'fieldTable/resize',
      fieldMove: 'fieldTable/move',
      fieldRename: 'fieldTable/rename',
      dataCreate: 'dataTable/create',
      dataRead: 'dataTable/read',
      dataUpdate: 'dataTable/update',
      dataDelete: 'dataTable/delete',
      dataMove: 'dataTable/move',
      dataBulkUpdate: 'dataTable/bulkUpdate',
    }),
    async onAddRow() {
      await this.dataCreate();
    },
    async onDelRow(rowId) {
      await this.dataDelete({id: rowId});
    },
    async onChangeValue({fieldId, rowId, value}) {
      await this.dataUpdate({fieldId, rowId, value});
    },
    async onChangeAggregating({aggregation, id}) {
      await this.fieldUpdate({
        id: id,
        fieldName: 'aggregate',
        value: aggregation
      });
    },
    async onAddCol({type, title}) {
      await this.fieldCreate({type, title});
    },
    async onDelCol(id) {
      await this.fieldDelete({id});
    },
    async onResizeCol({id, width}) {
      await this.fieldResize({id, width});
    },
    async onMoveCol({id, index}) {
      await this.fieldMove({id, index});
    },
    async onMoveRow({from, to}) {
      await this.dataMove({from, to});
    },
    async onUpdateCells(cells) {
      await this.dataBulkUpdate(cells);
    },
    async onRenameCol({id, title}) {
      await this.fieldRename({id, title});
    },

    cellEditorComponent(column) {
      if (column.type === COLUMN_TYPES.JSON) {
        return JsonEditor;
      }
      return null;
    }
  }
};
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
