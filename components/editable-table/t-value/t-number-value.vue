<template>
  <div class="table-value">
    <b-form-input
      v-if="edit && field.type === 'number'"
      v-model="localValue"
      :state="isValidValue"
      @change="setValue"
      @input="checkValid"
    />

    <span v-else>{{formatValue}}</span>
  </div>
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
        let val = value;
        if (this.field.type === 'number') {
          val = unFormatFloat(val);
        }

        return validateType(this.field.type, val);
      },
    }
  }
</script>
