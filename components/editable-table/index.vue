<template>
  <div class="table-wrapper">
    <div class="table">
      <t-head
        :fields="tempFields"
        :delete-mode="deleteMode"
        @add-col="$emit('add-col', $event)"
        @del-col="$emit('del-col', $event)"
        @delete-mode="deleteMode = $event"
        @resize-col="resizeColumn"
        @resize-col-stop="submitColumnResizing"
        @move-col="$emit('move-col', $event)"
      />

      <div class="table-body" v-click-outside="onClickOutside">
        <t-row
          v-for="(row, i) in rows" :key="String(row.name).replace(/ /g, '_')"
          :fields="tempFields"
          :value="row"
          :editField="(row.name === editableCell.row) ? editableCell.field : undefined"
          :delete-mode="deleteMode"
          @switch-edit-mode="switchEditMode"
          @del-row="onDeleteRow(row.name)"
          @change="onChangeValueInCell"
          @change-valid="onChangeValidInCell"
          @dragstart="draggingRow = i"
          @drop="moveRow(i)"
        />
      </div>

      <t-total
        :columns="columns"
        @change-aggregating="$emit('change-aggregating', $event)"
      />

      <t-add-row
        :fields="fields"
        @add-row="$emit('add-row')"
      />
    </div>
  </div>
</template>

<script>
import deepCopy from 'deepcopy';
import { getField } from "../../helpers/fields";
import tAddRow from './t-add-row.vue'
import tTotal from './t-total.vue'
import tHead from './t-head.vue'
import tRow from './t-row.vue'
import ColumnType from "./column-types/ColumnType";

export default {
  name: 'editable-table',
  components: {
    tAddRow,
    tTotal,
    tHead,
    tRow
  },
  props: {
    fields: { type: Array, required: true },
    rows: { type: Array, required: true },
    columnTypes: { type: Array, default: () => [] },
  },
  data() {
    return {
      tempFields: deepCopy(this.fields),
      editableCell: {
        field: undefined,
        row: undefined,
        isValid: true
      },
      deleteMode: false,
      resizingProps: null,
      draggingRow: null,
    }
  },
  computed: {
    columns () {
      return this.tempFields.map((field) => ({
        ...field,
        columnType: this.getColumnType(field.type),
        values: this.rows.map(row => row[field.name]),
      }));
    }
  },
  methods: {
    moveRow(rowIndex) {
      if (this.draggingRow === rowIndex) return;
      this.$emit('move-row', { from: this.draggingRow, to: rowIndex });
    },
    switchEditMode({ fieldName, rowName }) {
      // console.log(`Cell clicked fieldName:${fieldName}, rowName:${rowName}`);
      if (!this.editableCell.isValid) return;

      this.deleteMode = false;

      if (this.editableCell.field === fieldName && this.editableCell.row === rowName) {
        this.editableCell.field = null;
        this.editableCell.row = null;
      } else {
        this.editableCell.field = fieldName;
        this.editableCell.row = rowName;
      }

    },
    onDeleteRow(rowName) {
      this.$emit('del-row', rowName);
    },
    onChangeValueInCell(payload) {
      this.$emit('change', payload);
      this.unEditable();
    },
    onChangeValidInCell({ fieldName, rowName, isValid }) {
      this.isValid = isValid;
    },
    onClickOutside(event) {
      this.unEditable();
    },
    unEditable() {
      if (!this.editableCell.isValid) return;

      this.editableCell.field = undefined;
      this.editableCell.row = undefined;
    },
    resizeColumn ({ name, width }) {
      this.resizingProps = { name, width };
      const tempField = getField(this.tempFields, name);
      tempField.width = width;
    },
    submitColumnResizing () {
      if (!this.resizingProps) return;
      this.$emit('resize-col', this.resizingProps);
    },
    getColumnType (type) {
      return this.columnTypes.find(columnType => columnType.type === type);
    },
    getCellComponent(type) {
      const columnType = this.getColumnType(type);
      return (columnType || ColumnType).cell;
    }
  },
  provide() {
    return {
      columnTypes: this.columnTypes,
      getColumnType: this.getColumnType,
      getCellComponent: this.getCellComponent,
    };
  },
  watch: {
    fields: {
      handler () {
        this.tempFields = deepCopy(this.fields);
      },
      deep: true,
    },
  }
}
</script>

<style>
  .table-wrapper {
    overflow-x: auto;
    margin-bottom: 2rem;
  }

  .table {
    /* structure */
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: fit-content;
    /* design */
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
    justify-content: center;
    text-align: center;
  }

  .td .btn:focus, .btn-focus {
    box-shadow: none;
  }

  .td:last-child {
    width: 100px
  }

</style>
