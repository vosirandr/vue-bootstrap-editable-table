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
import {formatFloat, unFormatFloat,} from '../../helpers/index';
import tTypedCell from './t-cell-typed';

export default {
  name: 't-cell-number',
  extends: tTypedCell,
  computed: {
    valueFormatted() {
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
