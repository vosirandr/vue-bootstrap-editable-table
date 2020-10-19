<template>
  <div class="tr striped">
    <component
      v-for="field in fields"
      :key="field.name"
      :is="getCellComponent(field.type)"
      v-model="value[field.name]"
      :field="field"
      :edit="editField === field.name"
      @click="onCellClick(field.name)"
      @change="onValueChange($event, field.name)"
      @change-valid="onValidChange($event, field.name)"
    >
      <button
        v-if="field.name === 'name' && deleteMode"
        class="clear-btn-style del-btn left-position"
        @click="onClickDelete(field.name)"
      />
    </component>

    <t-data empty/>
  </div>
</template>

<script>
import getCellComponent from "./t-value/getCellComponent";
import tData from './t-data.vue'

export default {
  name: 't-row',
  components: {
    tData
  },
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, required: true },
    editField: undefined,
    deleteMode: { type: Boolean, default: false }
  },
  methods: {
    getCellComponent,
    onCellClick(fieldName) {
      this.$emit('click', { fieldName, rowName: this.value['name'] });
    },
    onValueChange(value, fieldName) {
      this.$emit('change', { fieldName, rowName: this.value['name'], value });
    },
    onValidChange(value, fieldName) {
      this.$emit('change-valid', { fieldName, rowName: this.value['name'], isValid: value });
    },
    onClickDelete(rowName) {
      this.$emit('del-row');
    },
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
</style>
