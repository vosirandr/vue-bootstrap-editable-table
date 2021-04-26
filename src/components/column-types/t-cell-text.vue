<template>
  <t-cell-filler
    :title="title"
    class="t-text-cell"
    @click="$emit('switch-edit-mode')"
  >
    <template v-if="edit">
      <component
        v-if="editorComponent"
        :is="editorComponent"
        v-bind="editorComponentBindings"
        @input="$emit('validate', $event)"
      />
      <b-form-textarea
        v-else
        ref="input"
        v-model="localValue"
        :state="isNullIfValid"
        size="sm"
        @change="setValue"
        @input="$emit('validate', $event)"
        @click.stop
      />
    </template>

    <span v-else>{{ formatValue }}</span>
  </t-cell-filler>
</template>

<script>
import tTypedCell from './t-cell-typed';

export default {
  name: 't-cell-text',
  extends: tTypedCell,
};
</script>

<style>
.t-text-cell textarea {
  height: 100%;
  min-height: 30px;
}
</style>
