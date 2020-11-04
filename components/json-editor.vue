<template>
  <b-modal
    ref="modal"
    title="Edit JSON"
    visible
    @ok="submit"
    @hidden="$emit('close')"
  >
    <vue-json-editor
      :value="json"
      @json-change="value = $event"
    />
  </b-modal>
</template>

<script>
  export default {
    name: "json-editor",
    props: {
      json: Object,
    },
    data() {
      return {
        value: this.json,
      }
    },
    methods: {
      submit() {
        this.$emit('submit', this.value);
        this.$refs.modal.hide();
      },
    }
  }
</script>

<style>
  div.jsoneditor-tree {
    min-height: 500px;
  }
</style>
