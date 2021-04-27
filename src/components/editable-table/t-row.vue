<template>
  <div class="tr striped">
    <t-data
      class="t-row-cell"
      :width="firstField.width"
      :draggable="readyToDrag"
      @dragstart="$emit('dragstart')"
      @dragover.prevent
      @drop="$emit('drop')"
    >
      <component
        :is="getCellComponent(firstField.type)"
        :value="row.values[firstField.id]"
        :field="firstField"
        :cell="getEditableCellData(firstField.id)"
        :cell-component-resolver="cellComponentResolver"
        @switch-edit-mode="switchEditMode(firstField.id)"
        @change="onValueChange($event, firstField.id)"
        @validate="onValidate(firstField.id, $event)"
      />

      <div class="t-row-func-buttons-wrapper">
        <move-button @mousedown="readyToDrag = true" @mouseup="readyToDrag = false"/>
        <delete-button @click="onClickDelete(firstField.id)"/>
      </div>
    </t-data>

    <t-data
      v-for="field in otherFields"
      :key="field.id"
      :width="field.width"
      @paste.stop="paste(field.id, $event)"
    >
      <component
        :is="getCellComponent(field.type)"
        :value="row.values[field.id]"
        :field="field"
        :cell="getEditableCellData(field.id)"
        :cell-component-resolver="cellComponentResolver"
        @switch-edit-mode="switchEditMode(field.id)"
        @change="onValueChange($event, field.id)"
        @validate="onValidate(field.id, $event)"
      />
    </t-data>

    <t-data empty @click="switchEditMode()"/>
  </div>
</template>

<script>
import {csvToArray} from "../../helpers";
import tData from './t-data.vue';
import DeleteButton from "../elements/delete-button";
import MoveButton from "../elements/move-button";
import {Row} from '../../dto';

export default {
  name: 't-row',
  components: {
    DeleteButton,
    MoveButton,
    tData
  },
  props: {
    fields: {type: Array, required: true},
    row: {type: Row, required: true},
    editableCell: {type: Object, default: null},
    cellComponentResolver: {type: Function, required: true}
  },
  data() {
    return {
      readyToDrag: false,
    };
  },
  computed: {
    firstField() {
      return this.fields[0];
    },
    otherFields() {
      return this.fields.slice(1);
    }
  },
  inject: ['getCellComponent'],
  methods: {
    getEditableCellData(fieldId) {
      if (!this.editableCell) return null;
      if (this.editableCell.field !== fieldId) return null;
      return this.editableCell;
    },
    switchEditMode(fieldId) {
      this.$emit('switch-edit-mode', {fieldId, rowId: this.row.id});
    },
    onValueChange(value, fieldId) {
      this.$emit('change', {fieldId, rowId: this.row.id, value});
    },
    onValidate(fieldId, value) {
      this.$emit('validate', {fieldId, rowId: this.row.id, value});
    },
    onClickDelete() {
      this.$emit('del-row');
    },
    paste(fieldId, e) {
      debugger;
      const csv = e.clipboardData.getData('text');
      const data = csvToArray(csv);
      if (data.length === 0 || (data.length === 1 && data[0].length === 1)) return;
      this.$emit('paste-csv', {fieldId, rowId: this.row.id, data});
    }
  }
};
</script>

<style lang="scss">
.b-editable-table-wrapper {
  .tr {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  .striped:nth-of-type(even) > * {
    background-color: #ffffff;
  }

  .striped:nth-of-type(odd) > * {
    background-color: #f8f9fa;
  }

  .t-row-func-buttons-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    right: 100%;
    width: 50px;
    height: 100%;
    margin-right: 1px;
    background-color: #efefef;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
  }

  .t-row-cell {
    position: relative;
  }

  .t-row-cell:hover .t-row-func-buttons-wrapper {
    opacity: 1;
  }
}
</style>
