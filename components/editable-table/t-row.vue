<template>
  <div class="tr striped">
    <t-data
      class="t-row-cell"
      :width="firstField.width"
      draggable
      @dragstart="$emit('dragstart')"
      @dragover.prevent
      @drop="$emit('drop')"
    >
      <component
        :is="getCellComponent(firstField.type)"
        :value="value[firstField.name]"
        :field="firstField"
        :cell="getEditableCellData(firstField.name)"
        @switch-edit-mode="switchEditMode(firstField.name)"
        @change="onValueChange($event, firstField.name)"
        @validate="onValidate(firstField.name, $event)"
      />

      <div class="t-row-func-buttons-wrapper">
        <delete-button @click="onClickDelete(firstField.name)" />
      </div>
    </t-data>

    <t-data
      v-for="field in otherFields"
      :key="field.name"
      :width="field.width"
      @paste.stop="paste(field.name, $event)"
    >
      <component
        :is="getCellComponent(field.type)"
        :value="value[field.name]"
        :field="field"
        :cell="getEditableCellData(field.name)"
        @switch-edit-mode="switchEditMode(field.name)"
        @change="onValueChange($event, field.name)"
        @validate="onValidate(field.name, $event)"
      />
    </t-data>

    <t-data empty @click="switchEditMode()"/>
  </div>
</template>

<script>
import tData from './t-data.vue'
import {csvToArray} from "~/helpers";
import DeleteButton from "~/components/delete-button";

export default {
  name: 't-row',
  components: {
    DeleteButton,
    tData
  },
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, required: true },
    editableCell: {type: Object, default: null},
  },
  computed: {
    rowName () {
      return this.value.name;
    },
    firstField () {
      return this.fields[0];
    },
    otherFields () {
      return this.fields.slice(1);
    }
  },
  inject: ['getCellComponent'],
  methods: {
    getEditableCellData(fieldName) {
      if (!this.editableCell) return null;
      if (this.editableCell.field !== fieldName) return null;
      return this.editableCell;
    },
    switchEditMode(fieldName) {
      this.$emit('switch-edit-mode', { fieldName, rowName: this.rowName });
    },
    onValueChange(value, fieldName) {
      this.$emit('change', { fieldName, rowName: this.rowName, value });
    },
    onValidate(fieldName, value) {
      this.$emit('validate', {fieldName, rowName: this.rowName, value });
    },
    onClickDelete(rowName) {
      this.$emit('del-row');
    },
    paste (fieldName, e) {
      const csv = e.clipboardData.getData('text');
      const data = csvToArray(csv);
      if (data.length === 0 || (data.length === 1 && data[0].length === 1)) return;
      this.$emit('paste-csv', { fieldName, rowName: this.rowName, data });
    }
  }
}
</script>

<style>
  .tr {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  .striped:nth-of-type(even) {
    background-color: #ffffff;
  }

  .striped:nth-of-type(odd) {
    background-color: #f8f9fa;
  }

  .t-row-func-buttons-wrapper {
    display: none;
    position: absolute;
    top: 0;
    left: -31px;
    width: 30px;
    height: 100%;
    background-color: #efefef;
    justify-content: space-around;
    align-items: center;
  }

  .t-row-cell {
    position: relative;
  }

  .t-row-cell:hover .t-row-func-buttons-wrapper {
    display: flex;
  }
</style>
