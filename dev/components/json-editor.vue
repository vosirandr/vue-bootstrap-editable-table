<template>
  <div class="d-flex align-items-stretch justify-content-center h-100 w-100">
    <span
      class="t-json-value__format w-100"
      v-text="valueFormatted || ' '"
      @click.stop="$emit('switch-edit-mode')"
    />
    <b-modal
      v-if="isEdit"
      ref="modal"
      title="Edit JSON"
      ok-only
      @ok="handleOk"
      @hide="handleModalHide"
      @hidden="$emit('exit')"
      @click.native.stop
    >
      <div @click.stop>
        <vue-json-editor v-model="val"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {Column} from '../../src/dto/index';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: "json-editor",
  props: {
    column: {type: Column, required: true},
    value: {type: [String, Number, Array, Object], default: null},
    valueFormatted: {type: String, default: ''},
    setValue: {type: Function, required: true},
    isEdit: {type: Boolean, default: false},
    isValid: {type: Boolean, default: true},
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
    },
    isEdit(v) {
      if (v) {
        this.$nextTick(() => {
          this.$refs.modal.show();
          this.$emit('validate', false);
        });
      } else if (this.$refs.modal) {
        this.$refs.modal.hide();
      }
    }
  },
  methods: {
    handleModalHide(bvModalEvt){
      this.$emit('validate', this.val);
      if(!this.isValid){
        // Prevent modal from closing
        bvModalEvt.preventDefault();
      }
    },
    handleOk(bvModalEvt) {
      this.closeModal();
    },
    closeModal() {
      this.$emit('validate', this.val);
      this.setValue(this.val);
    }
  }
};
</script>

<style>
div.jsoneditor-tree {
  min-height: 500px;
}
</style>
