<template>
  <t-data
    class="t-text-cell"
    :width="field.width"
    @click="$emit('click')"
  >
    <b-form-textarea
      v-if="edit"
      v-model="localValue"
      size="sm"
      @change="setValue"
      @input="checkValid"
    />

    <span v-else>{{formatValue}}</span>

    <slot />
  </t-data>
</template>

<script>
  import tTypedCell from './t-typed-cell';

  export default {
    name: 't-text-cell',
    extends: tTypedCell,
  }
</script>

<style>
  .t-text-cell textarea {
    height: 100%;
    min-height: 30px;
  }
</style>
