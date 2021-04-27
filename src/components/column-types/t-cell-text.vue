<template>
  <component
    v-if="cellComponent"
    :is="cellComponent"
    v-bind="cellComponentBindings"
    v-on="$listeners"
  />
  <t-cell-filler
    v-else
    :title="title"
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
    <span v-else>{{ valueFormatted }}</span>
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
