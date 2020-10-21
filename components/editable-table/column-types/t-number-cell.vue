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
    formatFloat,
    validateType,
    unFormatFloat,
  } from '~/helpers';
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
    }
  }
</script>
