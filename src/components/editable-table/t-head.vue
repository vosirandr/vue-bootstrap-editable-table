<template>
  <div class="tr th">
    <t-head-cell
      v-for="field in fields"
      :key="field.id"
      :field="field"
      :first-column-id="firstColumnId"
      @delete="onClickDelete"
      @resize="$emit('resize-col', {id: field.id, width: $event})"
      @resize-stop="$emit('resize-col-stop')"
      @drag="draggingColumn = $event"
      @drop="moveColumn($event)"
      @rename="$emit('rename-col', {id: field.id, title: $event})"
    />

    <t-data
      class="td__func-buttons-wrapper"
      :width="50"
      @dragover.prevent
      @drop="moveLastColumn"
    >
      <b-button class="px-2 py-1" variant="link" @click="showModal = true">
        <b-icon icon="plus" font-scale="2"/>
      </b-button>
    </t-data>

    <add-column-modal
      v-if="showModal"
      :types="columnTypes"
      :fields-length="fields.length"
      @submit="addColumn"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import {getFieldIndex} from "../../helpers/fields";
import tData from './t-data.vue';
import AddColumnModal from '../add-column-modal';
import THeadCell from "./t-head-cell";

export default {
  name: 't-head',
  components: {
    THeadCell,
    tData,
    AddColumnModal,
  },
  props: {
    fields: {type: Array, required: true},
    firstColumnId: {type: [String, Number], required: true},
  },
  data() {
    return {
      showModal: false,
      draggingColumn: null,
    };
  },
  inject: ['columnTypes'],
  methods: {
    onClickDelete(id) {
      this.$emit('del-col', id);
    },
    addColumn(column) {
      this.$emit('add-col', column);
    },
    moveColumn(target) {
      if (!this.draggingColumn) return;

      const index = getFieldIndex(this.fields, target);
      const currentIndex = getFieldIndex(this.fields, this.draggingColumn);
      if (index === -1 || currentIndex === -1) return;
      if (index === 0 || currentIndex === 0) return;// not allowed for first column

      const nextIndex = index;
      if (nextIndex === currentIndex) return;

      this.$emit('move-col', {
        id: this.draggingColumn,
        index: nextIndex,
      });
    },
    moveLastColumn() {
      if (!this.draggingColumn) return;

      const currentIndex = getFieldIndex(this.fields, this.draggingColumn);
      if (currentIndex === -1) return;

      this.$emit('move-col', {
        id: this.draggingColumn,
        index: this.fields.length,
      });
    }
  }
};
</script>

<style lang="scss">
.b-editable-table-wrapper {
  .th > .td {
    white-space: normal;
    justify-content: center;
    border-top: 1px solid #d0d0d0;
  }

  .td__func-buttons-wrapper {
    background-color: #dee2e6;
  }
}
</style>
