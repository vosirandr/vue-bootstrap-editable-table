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
  import tValue from './t-value';

  export default {
    name: 't-number-value',
    extends: tValue,
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
