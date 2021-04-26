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
import {
  formatPercents,
  unFormatFloat,
  isUndefinedOrNullOrEmpty,
} from '../../helpers/index';
import tTypedCell from './t-cell-typed';

export default {
  name: 't-cell-percent',
  extends: tTypedCell,
  computed: {
    formatValue() {
      return formatPercents(this.value);
    }
  },
  methods: {
    convertValueToLocal(value) {
      if (isUndefinedOrNullOrEmpty(value)) return value;
      return value * 100;
    },
    convertValueToExternal(value) {
      if (value.trim() === '') return undefined;
      return unFormatFloat(value) / 100;
    },
  }
};
</script>
