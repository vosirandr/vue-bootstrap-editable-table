<template>
  <t-cell-filler
    :title="title"
    @click="$emit('switch-edit-mode')"
  >
    <template v-if="edit">
      <component
        v-if="editorComponent"
        :is="editorComponent"
        v-bind="editorComponentBindings"
        @input="$emit('validate', $event)"
      />
      <b-form-input
        v-else
        ref="input"
        v-model="localValue"
        :state="isNullIfValid"
        @change="setValue"
        @input="$emit('validate', $event)"
        @click.stop
      />
    </template>

    <span v-else>{{ formatValue }}</span>
  </t-cell-filler>
</template>

<script>
import {formatFloat, unFormatFloat,} from '../../helpers/index';
import tTypedCell from './t-cell-typed';

export default {
  name: 't-cell-number',
  extends: tTypedCell,
  computed: {
    formatValue() {
      return formatFloat(this.value);
    }
  },
  methods: {
    convertValueToExternal(value) {
      if (value.trim() === '') return undefined;
      return Number(unFormatFloat(value));
    },
  }
};
</script>
