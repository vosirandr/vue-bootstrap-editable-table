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
      {{ value[firstField.name] }}

      <div class="t-row-func-buttons-wrapper">
        <b-button
          class="t-row__delete"
          variant="link"
          @click="onClickDelete(firstField.name)"
        >
          <b-icon icon="x" />
        </b-button>
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
        :edit="editField === field.name"
        @switch-edit-mode="switchEditMode(field.name)"
        @change="onValueChange($event, field.name)"
        @change-valid="onValidChange($event, field.name)"
      />
    </t-data>

    <t-data empty @click="switchEditMode()"/>
  </div>
</template>

<script>
import tData from './t-data.vue'
import {csvToArray} from "../../helpers";

export default {
  name: 't-row',
  components: {
    tData
  },
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, required: true },
    editField: undefined,
  },
  computed: {
    rowName () {
      return this.value['name'];
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
    switchEditMode(fieldName) {
      this.$emit('switch-edit-mode', { fieldName, rowName: this.rowName });
    },
    onValueChange(value, fieldName) {
      this.$emit('change', { fieldName, rowName: this.rowName, value });
    },
    onValidChange(value, fieldName) {
      this.$emit('change-valid', { fieldName, rowName: this.rowName, isValid: value });
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

  .t-row__delete {
    padding: 0;
    width: 20px;
    height: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .t-row__delete:hover {
    background-color: #bdbcbc;
  }

  .t-row-cell {
    position: relative;
  }

  .t-row-cell:hover .t-row-func-buttons-wrapper {
    display: flex;
  }
</style>
