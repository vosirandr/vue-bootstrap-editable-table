<template>
  <t-cell-filler
    class="t-json-value"
    :title="title"
    @click="editMode = true"
  >
    <template v-if="editMode">
      <component
        v-if="editorComponent"
        :is="editorComponent"
        v-bind="editorComponentBindings"
        @input="$emit('validate', $event)"
        @exit="editMode = false"
      />
      <b-form-textarea
        v-else
        ref="input"
        class="t-json-value__format"
        v-model="val"
        :state="isNullIfValid"
        size="sm"
        @change="setValue"
        @input="$emit('validate', $event)"
        @click.stop
      />
    </template>
    <span v-else class="t-json-value__format">{{ formatValue }}</span>
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
  data() {
    return {
      editMode: false
    };
  },
  computed: {
    val: {
      get() {
        return JSON.stringify(this.value, null, 2);
      },
      set(v) {
        try {
          this.setValue(JSON.parse(v));
        } catch (e) {
          this.setValue(null);
        }
      }
    },
    formatValue() {
      if (!this.value) return '';
      const jsonString = JSON.stringify(this.value, null, 2);
      return sliceWithEllipsis(jsonString, 100);
    }
  },
  methods: {}
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
