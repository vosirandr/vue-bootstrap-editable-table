<template>
  <component
    v-if="cellComponent"
    :is="cellComponent"
    v-bind="cellComponentBindings"
    v-on="$listeners"
  />
  <t-cell-filler
    v-else
    :title="title"
    @click="$emit('switch-edit-mode')"
  >
    <b-form-input
      v-if="edit"
      ref="input"
      v-model="localValue"
      :state="isNullIfValid"
      @change="setValue"
      @input="$emit('validate', $event)"
      @click.stop
    />
    <span v-else>{{ valueFormatted }}</span>
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
    valueFormatted() {
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
