<template>
  <t-data
    :class="[
      't-head-cell',
      readyToResize && 't-head-cell--resizing'
    ]"
    :title="capitalize(field.type)"
    :width="field.width"
    :draggable="readyToDrag && !readyToResize && field.name !== generalField"
    @dragstart="$emit('drag', field.name)"
    @dragover.prevent
    @drop="$emit('drop', field.name)"
  >
    <div
      v-if="field.name !== 'name'"
      class="t-head-func-buttons-wrapper"
    >
      <move-button @mousedown="readyToDrag = true" @mouseup="readyToDrag = false"/>

      <delete-button @click="$emit('delete', field.name)"/>
    </div>

    <font-awesome-icon :icon="getColumnType(field.type).icon"/>

    &nbsp;

    <t-editable-label :value="field.caption" @input="$emit('rename', $event)"/>
  </t-data>
</template>

<script>
import {capitalize} from "../../helpers";
import tData from './t-data.vue';
import tEditableLabel from "./t-editable-label";
import MoveButton from "../move-button";
import DeleteButton from "../delete-button";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  name: "t-head-cell",
  components: {
    DeleteButton,
    MoveButton,
    tEditableLabel,
    tData,
    FontAwesomeIcon,
  },
  props: {
    field: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      readyToResize: false,
      readyToDrag: false,
      resizingPosition: null,
    };
  },
  inject: ['getColumnType', 'generalField'],
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    this.$el.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  },
  methods: {
    capitalize(text) {
      return capitalize(text);
    },
    onMouseDown(e) {
      if (this.readyToResize) {
        this.resizingPosition = e.clientX - this.field.width;
      }
    },
    onMouseMove(e) {
      if (this.resizingPosition) {
        this.$emit('resize', e.clientX - this.resizingPosition);
      } else {
        this.calcReadyToResize(e);
      }
    },
    onMouseUp() {
      if (!this.resizingPosition) return;
      this.resizingPosition = null;
      this.$emit('resize-stop');
    },
    calcReadyToResize(e) {
      const bounds = e.target.getBoundingClientRect();
      this.readyToResize = bounds.right - e.clientX < 5;
    },
  },
};
</script>

<style>
.t-head-cell--resizing {
  cursor: col-resize;
}

.t-head-cell {
  font-size: 14px;
  background-color: #dee2e6;
  padding: 0 5px;
}

.t-head-func-buttons-wrapper {
  display: flex;
  position: absolute;
  top: -31px;
  right: 0;
  width: 100%;
  height: 30px;
  background-color: #efefef;
  justify-content: space-around;
  align-items: center;
  opacity: 0;
}

.t-head-cell:hover .t-head-func-buttons-wrapper {
  opacity: 1;
}
</style>
