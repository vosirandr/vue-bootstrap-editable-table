<template>
  <t-cell-filler
    @click="$emit('switch-edit-mode')"
  >
    <b-form-input
      v-if="edit"
      ref="input"
      v-model="localValue"
      :state="isNullIfValid"
      @change="setValue"
      @input="checkValid"
      @click.stop
    />

    <span v-else>{{formatValue}}</span>
  </t-cell-filler>
</template>

<script>
  import {
    formatFloat,
    validateType,
    unFormatFloat,
  } from '../../../helpers';
  import tTypedCell from './t-typed-cell';

  export default {
    name: 't-number-cell',
    extends: tTypedCell,
    computed: {
      formatValue() {
        return formatFloat(this.value);
      }
    },
    methods: {
      validate(value) {
        return validateType(this.field.type, unFormatFloat(value));
      },
      convertValueToExternal (value) {
        if (value.trim() === '') return undefined;
        return Number(unFormatFloat(value));
      },
    }
  }
</script>
