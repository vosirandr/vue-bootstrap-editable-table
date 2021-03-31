<template>
  <t-cell-filler
    class="t-text-cell"
    @click="$emit('switch-edit-mode')"
  >
    <b-form-textarea
      v-if="edit"
      ref="input"
      v-model="localValue"
      :state="isNullIfValid"
      size="sm"
      @change="setValue"
      @input="$emit('validate', $event)"
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
