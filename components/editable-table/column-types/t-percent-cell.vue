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
      @input="$emit('validate', $event)"
      @click.stop
    />

    <span v-else>{{formatValue}}</span>
  </t-cell-filler>
</template>

<script>
  import {
    formatPercents,
    unFormatFloat,
    isUndefinedOrNullOrEmpty,
  } from '~/helpers';
  import tTypedCell from './t-typed-cell';

  export default {
    name: 't-percent-cell',
    extends: tTypedCell,
    computed: {
      formatValue() {
        return formatPercents(this.value);
      }
    },
    methods: {
      convertValueToLocal (value) {
        if (isUndefinedOrNullOrEmpty(value)) return value;
        return value * 100;
      },
      convertValueToExternal (value) {
        if (value.trim() === '') return undefined;
        return unFormatFloat(value) / 100;
      },
    }
  }
</script>
