<template>
  <component
    v-if="cellComponent"
    :is="cellComponent"
    v-bind="cellComponentBindings"
    v-on="$listeners"
  />
  <t-cell-filler
    v-else
    class="t-json-value"
    :title="title"
    @click="$emit('switch-edit-mode')"
  >
    <b-form-textarea
      v-if="edit"
      ref="input"
      class="t-json-value__format"
      :value="val"
      :state="isNullIfValid"
      size="sm"
      @blur="val = $event.target.value"
      @input="validate"
      @click.stop
    />
    <span v-else class="t-json-value__format">{{ valueFormatted }}</span>
  </t-cell-filler>
</template>

<script>
import {sliceWithEllipsis} from "../../helpers/index";
import tTypedCell from './t-cell-typed';
import jsonEditor from '../../../dev/components/json-editor';

export default {
  name: 't-cell-json',
  components: {
    jsonEditor,
  },
  extends: tTypedCell,
  computed: {
    val: {
      get() {
        return JSON.stringify(this.localValue || {}, null, 2);
      },
      set(v) {
        try {
          this.setValue(JSON.parse(v));
        } catch (e) {
          // nothing
        }
      }
    },
    valueFormatted() {
      if (!this.value) return '';
      return sliceWithEllipsis(this.val, 100);
    }
  },
  methods: {
    validate(val) {
      let object;
      try {
        object = JSON.parse(val);
      } catch {
        object = undefined;
      }
      this.$emit('validate', object);
    }
  }
};
</script>

<style>
.t-json-value__format {
  font-family: "Courier New";
  font-size: 0.8rem;
  display: block;
  width: 100%;
  text-align: left;
  white-space: pre-wrap;
}
</style>
