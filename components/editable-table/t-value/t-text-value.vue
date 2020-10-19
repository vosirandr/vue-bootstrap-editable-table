<template>
  <t-data
    :grow="field.grow"
    @click="$emit('click')"
  >
    <b-form-textarea
      v-if="edit"
      v-model="localValue"
      size="sm"
      rows="2"
      max-rows="3"
      :state="isValidValue"
      @change="setValue"
      @input="checkValid"
    />

    <span v-else>{{formatValue}}</span>

    <slot />
  </t-data>
</template>

<script>
  import tValue from './t-value';

  export default {
    name: 't-text-value',
    extends: tValue,
  }
</script>
