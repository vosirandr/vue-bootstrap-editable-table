<template>
  <t-data
    :grow="field.grow"
    @click="$emit('click')"
  >
    <b-form-input
      v-if="edit"
      v-model="localValue"
      :state="isValidValue"
      @change="setValue"
      @input="checkValid"
    />

    <span v-else>{{formatValue}}</span>
  </t-data>
</template>

<script>
  import {
    formatPercents,
    validateType,
    unFormatFloat,
  } from '~/helpers';
  import tTypedCell from './t-typed-cell';

  export default {
    name: 't-number-cell',
    extends: tTypedCell,
    computed: {
      formatValue() {
        return formatPercents(this.value);
      }
    },
    methods: {
      validate(value) {
        return validateType('number', unFormatFloat(value));
      },
      convertValueToLocal (value) {
        return value * 100;
      },
      convertValueToExternal (value) {
        return value / 100;
      },
    }
  }
</script>
