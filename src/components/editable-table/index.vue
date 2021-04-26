<template>
  <div class="table-wrapper">
    <div class="table">
      <t-head
        class="table-header"
        :fields="tempFields"
        :first-column-id="firstColumnId"
        @add-col="$emit('add-col', $event)"
        @del-col="$emit('del-col', $event)"
        @rename-col="$emit('rename-col', $event)"
        @resize-col="resizeColumn"
        @resize-col-stop="submitColumnResizing"
        @move-col="$emit('move-col', $event)"
      />

      <div class="table-body-wrapper" :style="{height}">
        <div class="table-body" v-click-outside="onClickOutside">
          <t-row
            v-for="(row, i) in tempRows" :key="row.id"
            :fields="tempFields"
            :row="row"
            :editable-cell="editableCell && row.id === editableCell.row ? editableCell : null"
            :cell-editor-component="cellEditorComponent"
            @switch-edit-mode="switchEditMode"
            @del-row="onDeleteRow(row.id)"
            @change="onChangeValueInCell"
            @validate="validateCell"
            @dragstart="draggingRow = i"
            @drop="moveRow(i)"
            @paste-csv="pasteCSV"
          />
        </div>

        <t-total
          :columns="tempFields"
          :rows="tempRows"
          :first-column-id="firstColumnId"
          @change-aggregating="$emit('change-aggregating', $event)"
        />

        <t-add-row
          :fields="tempFields"
          :first-column-id="firstColumnId"
          @add-row="$emit('add-row')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {getField, getFieldIndex} from '../../helpers/fields';
import tAddRow from './t-add-row.vue';
import tTotal from './t-total.vue';
import tHead from './t-head.vue';
import tRow from './t-row.vue';
import clickOutsideDirective from '../../directives/click-outside';
import {Column, Row} from '../../dto';
import COLUMN_TYPES from '../../services/column-types';
import ColumnService from '../../services/ColumnService';
import FieldValidator from '../../services/FieldValidator';
import FieldStringParser from '../../services/FieldStringParser';

export default {
  name: 'editable-table',
  components: {
    tAddRow,
    tTotal,
    tHead,
    tRow
  },
  directives: {
    'click-outside': clickOutsideDirective
  },
  props: {
    fields: {type: Array, required: true},
    rows: {type: Array, required: true},
    columnTypes: {type: Array, default: () => Object.values(COLUMN_TYPES)},
    height: {type: String, default: '500px'},
    cellEditorComponent: {type: Function, default: () => null}
  },
  data() {
    return {
      tempFields: this.prepareFields(),
      editableCell: {
        field: null,
        row: null,
        isValid: true
      },
      resizingProps: null,
      draggingRow: null,
    };
  },
  computed: {
    firstColumnId() {
      if (this.tempFields.length) {
        return this.tempFields[0].id;
      }
      return null;
    },
    tempRows() {
      return this.rows.map(row => new Row(row));
    },
  },
  watch: {
    fields: {
      handler() {
        this.tempFields = this.prepareFields();
      },
      deep: true
    }
  },
  methods: {
    prepareFields() {
      return this.fields.map(field => new Column(field));
    },
    validateCell({fieldId, rowId, value}) {
      const field = this.getFieldById(fieldId);

      if (field.unique && this.tempRows.some(row => row.id !== rowId && row.values[fieldId].value === value)) {
        this.editableCell.isValid = false;
        return;
      }

      this.editableCell.isValid = (new FieldValidator(field)).validate(value);
    },
    moveRow(rowIndex) {
      if (this.draggingRow === rowIndex) return;
      this.$emit('move-row', {from: this.draggingRow, to: rowIndex});
    },
    switchEditMode({fieldId, rowId}) {
      if (!this.editableCell.isValid) return;

      if (this.editableCell.field === fieldId && this.editableCell.row === rowId) {
        this.editableCell.field = null;
        this.editableCell.row = null;
      } else {
        this.editableCell.field = fieldId;
        this.editableCell.row = rowId;
      }

    },
    onDeleteRow(rowId) {
      this.$emit('del-row', rowId);
    },
    onChangeValueInCell(payload) {
      this.$emit('change', payload);
      this.unEditable();
    },
    onClickOutside(event) {
      this.unEditable();
    },
    unEditable() {
      if (!this.editableCell.isValid) return;

      this.editableCell.field = null;
      this.editableCell.row = null;
    },
    resizeColumn({id, width}) {
      this.resizingProps = {id, width};
      const tempField = getField(this.tempFields, id);
      tempField.width = width;
    },
    pasteCSV({fieldId, rowId, data}) {
      const iterate = (table, csv, id, callback) => {
        const rowIndex = getFieldIndex(table, id);
        for (let iCSV = 0; iCSV < csv.length; iCSV++) {
          const iTable = rowIndex + iCSV;
          callback(iTable, iCSV);
        }
      };

      const updatedRows = [];

      iterate(this.rows, data, rowId, (iRows, yCSV) => {
        const updatedRow = {id: this.rows[iRows] && this.rows[iRows].id};
        iterate(this.tempFields, data[yCSV], fieldId, (iFields, xCSV) => {
          if (iFields >= this.tempFields.length) return;

          const column = this.tempFields[iFields];
          const csvValue = data[yCSV][xCSV];
          updatedRow['values.' + column.id] = FieldStringParser.convertToValue(column.type, csvValue);
        });
        updatedRows.push(updatedRow);
      });

      this.$emit('update-cells', updatedRows);
    },
    submitColumnResizing() {
      if (!this.resizingProps) return;
      this.$emit('resize-col', this.resizingProps);
    },
    getFieldById(fieldId) {
      return this.tempFields.find(field => field.id === fieldId);
    },
    getCellComponent(type) {
      return ColumnService.component(type);
    }
  },
  provide() {
    return {
      columnTypes: this.columnTypes,
      getCellComponent: this.getCellComponent,
    };
  },
};
</script>

<style>
.table-wrapper {
  padding: 2rem 0;
  position: relative;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.table-body-wrapper {
  overflow: auto;
}

.table-body-wrapper,
.table-header {
  padding-left: 50px;
}

.table {
  /* structure */
  width: fit-content;
  height: 100%;
  /* design */
  font-family: Arial;
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
  width: 50px
}

</style>
