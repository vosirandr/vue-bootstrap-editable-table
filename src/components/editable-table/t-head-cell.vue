<template>
  <t-data
    class="t-head-cell"
    :title="capitalize(field.type)"
    :width="field.width"
    :draggable="readyToDrag && !readyToResize && field.id !== firstColumnId"
    @dragstart="$emit('drag', field.id)"
    @dragover.prevent
    @drop="$emit('drop', field.id)"
  >
    <div v-if="field.id !== firstColumnId" class="t-head-func-buttons-wrapper">
      <move-button class="mr-3" @mousedown="readyToDrag = true" @mouseup="readyToDrag = false"/>
      <delete-button @click="$emit('delete', field.id)"/>
    </div>

    <font-awesome-icon :icon="icon" class="mr-1"/>
    <t-editable-label :value="field.title" @input="$emit('rename', $event)"/>
    <div class="t-head-drag-el" @mouseenter="readyToResize=true" @mouseleave="readyToResize=false"/>
  </t-data>
</template>

<script>
import {capitalize} from "../../helpers";
import tData from './t-data.vue';
import tEditableLabel from "./t-editable-label";
import MoveButton from "../elements/move-button";
import DeleteButton from "../elements/delete-button";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import ColumnService from '../../services/ColumnService';
import throttle from 'lodash/throttle';

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
    field: {type: Object, required: true},
    firstColumnId: {type: [String, Number], required: true},
  },
  data() {
    return {
      readyToResize: false,
      readyToDrag: false,
      resizingPosition: null,
    };
  },
  computed: {
    icon() {
      return ColumnService.icon(this.field.type);
    }
  },
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
    onMouseMove: throttle(function (e) {
      if (this.resizingPosition) {
        let newWidth = e.clientX - this.resizingPosition;
        const MIN_WIDTH = 80;
        if (newWidth < MIN_WIDTH) {
          newWidth = MIN_WIDTH;
        }
        this.$emit('resize', newWidth);
      }
    }, 10),
    onMouseUp() {
      if (!this.resizingPosition) return;
      this.resizingPosition = null;
      this.$emit('resize-stop');
    },
  },
};
</script>

<style>
.t-head-cell {
  font-size: 14px;
  background-color: #dee2e6;
  padding: 0 5px;
}

.t-head-drag-el {
  cursor: col-resize;
  position: absolute;
  right: 0;
  width: 5px;
  top: 0;
  height: 100%;
}

.t-head-func-buttons-wrapper {
  display: flex;
  position: absolute;
  top: -31px;
  right: 0;
  left: 0;
  height: 30px;
  background-color: #efefef;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 1;
}

.t-head-cell:hover .t-head-func-buttons-wrapper {
  opacity: 1;
}
</style>
