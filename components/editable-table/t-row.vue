<template>
  <div class="tr striped">
    <t-data
      :width="firstField.width"
      draggable
      @dragstart="$emit('dragstart')"
      @dragover.prevent
      @drop="$emit('drop')"
    >
      {{ value[firstField.name] }}

      <b-button
        v-if="deleteMode"
        class="t-row__delete"
        variant="link"
        @click="onClickDelete(firstField.name)"
      >
        <b-icon icon="x" />
      </b-button>
    </t-data>

    <t-data
      v-for="field in otherFields"
      :key="field.name"
      :width="field.width"
    >
      <component
        :is="getCellComponent(field.type)"
        v-model="value[field.name]"
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

export default {
  name: 't-row',
  components: {
    tData
  },
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, required: true },
    editField: undefined,
    deleteMode: { type: Boolean, default: false },
  },
  computed: {
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
      this.$emit('switch-edit-mode', { fieldName, rowName: this.value['name'] });
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

  .t-row__delete {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
  }
</style>
