<template>
  <t-data
    :class="[
      't-head-cell',
       readyToResize && 't-head-cell--resizing'
    ]"
    :width="field.width"
  >
    <button
      v-if="field.name !== 'name' && deleteMode"
      class="clear-btn-style del-btn top-position"
      @click="$emit('delete', field.name)"
    />

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
      deleteMode: Boolean,
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
      onMouseUp (e) {
        this.resizingPosition = null;
      },
      calcReadyToResize (e) {
        const bounds = e.target.getBoundingClientRect();
        this.readyToResize = bounds.right - e.clientX < 5;
      },
    },
    mounted () {
      this.$el.addEventListener('mousedown', this.onMouseDown);
      this.$el.addEventListener('mousemove', this.onMouseMove);
      this.$el.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy() {
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.$el.removeEventListener('mousemove', this.onMouseMove);
      this.$el.removeEventListener('mouseup', this.onMouseUp);
    },
  }
</script>

<style>
  .t-head-cell--resizing {
    cursor: col-resize;
  }
</style>
