<template>
  <t-cell-filler
    class="t-text-cell"
    @click="$emit('switch-edit-mode')"
  >
    <b-form-textarea
      v-if="edit"
      v-model="localValue"
      size="sm"
      @change="setValue"
      @input="checkValid"
      @click.stop
    />

    <span v-else>{{formatValue}}</span>
  </t-cell-filler>
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
