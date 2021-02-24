<template>
  <t-data
    :class="[
      't-head-cell',
       readyToResize && 't-head-cell--resizing'
    ]"
    :width="field.width"
    :draggable="!readyToResize && field.name !== 'name'"
    @dragstart="$emit('drag', field.name)"
    @dragover.prevent
    @drop="$emit('drop', field.name)"
    >
    <b-button
      v-if="field.name !== 'name'"
      class="t-head-cell__delete"
      variant="link"
      @click="$emit('delete', field.name)"
    >
      <b-icon icon="x" />
    </b-button>

    {{field.caption}}
  </t-data>
</template>

<script>
  import tData from './t-data.vue';

  export default {
    name: "t-head-cell",
    components: {
      tData,
    },
    props: {
      field: Object,
    },
    data () {
      return {
        readyToResize: false,
        resizingPosition: null,
      }
    },
    methods: {
      onMouseDown (e) {
        if (this.readyToResize) {
          this.resizingPosition = e.clientX - this.field.width;
        }
      },
      onMouseMove (e) {
        if (this.resizingPosition) {
          this.$emit('resize', e.clientX - this.resizingPosition);
        } else {
          this.calcReadyToResize(e);
        }
      },
      onMouseUp () {
        if (!this.resizingPosition) return;
        this.resizingPosition = null;
        this.$emit('resize-stop');
      },
      calcReadyToResize (e) {
        const bounds = e.target.getBoundingClientRect();
        this.readyToResize = bounds.right - e.clientX < 5;
      },
    },
    mounted () {
      this.$el.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy() {
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    },
  }
</script>

<style>
  .t-head-cell--resizing {
    cursor: col-resize;
  }
  .t-head-cell__delete {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    display: none;
  }
  .t-head-cell:hover .t-head-cell__delete {
    display: block;
  }
</style>
