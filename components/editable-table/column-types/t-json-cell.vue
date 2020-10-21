<template>
  <t-data
    class="t-json-value"
    :grow="field.grow"
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
  </t-data>
</template>

<script>
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
        return this.value && JSON.stringify(this.value, null,  2);
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
