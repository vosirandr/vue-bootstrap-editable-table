<template>
  <t-cell-filler
    class="t-json-value"
    @click="modalShown = true"
  >
    <span class="t-json-value__format">{{formatValue}}</span>

    <json-editor
      ref="modal"
      v-if="modalShown"
      :json="value"
      @submit="setValue"
      @close="modalShown = false"
    />
  </t-cell-filler>
</template>

<script>
  import { sliceWithEllipsis } from "../../../helpers";
  import tTypedCell from './t-typed-cell';
  import jsonEditor from '../../json-editor';

  export default {
    name: 't-json-cell',
    extends: tTypedCell,
    components: {
      jsonEditor,
    },
    data () {
      return {
        modalShown: false,
      }
    },
    computed: {
      formatValue () {
        if (!this.value) return '';
        const jsonString = JSON.stringify(this.value, null,  2);
        return sliceWithEllipsis(jsonString, 100);
      }
    },
  }
</script>

<style>
  .t-json-value__format {
    width: 100%;
    text-align: left;
    white-space: pre-wrap;
  }
</style>
