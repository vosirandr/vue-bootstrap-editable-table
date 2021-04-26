<template>
  <b-modal
    ref="modal"
    title="Edit JSON"
    ok-only
    @ok="handleOk"
    @hidden="$emit('exit')"
  >
    <vue-json-editor v-model="val"/>
  </b-modal>
</template>

<script>
import {Column} from '../../src/dto/index';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: "json-editor",
  props: {
    column: {type: Column, required: true},
    valid: {type: Boolean, default: true},
    value: {type: [String, Number, Array, Object], default: null},
    setValue: {type: Function, required: true},
  },
  data() {
    return {
      showModal: false,
      val: cloneDeep(this.value)
    };
  },
  watch: {
    value: {
      handler(val) {
        this.val = cloneDeep(val);
      },
      deep: true
    }
  },
  mounted() {
    this.$refs.modal.show();
  },
  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.closeModal();
    },
    closeModal() {
      this.setValue(this.val);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>

<style>
div.jsoneditor-tree {
  min-height: 500px;
}
</style>
