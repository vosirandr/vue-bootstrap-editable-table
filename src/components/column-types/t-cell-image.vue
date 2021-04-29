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

    <b-img
      v-else-if="hasImageUrl"
      :src="valueFormatted"
      :height="imageSize.height"
      :width="imageSize.width"
    />
  </t-cell-filler>
</template>

<script>
import {isUndefinedOrNullOrEmpty} from '../../helpers/index';
import tTypedCell from './t-cell-typed';

const DEFAULT_IMAGE_SIZE = {width: 40, height: 40};

export default {
  name: 't-cell-image',
  extends: tTypedCell,
  computed: {
    imageSize() {
      return DEFAULT_IMAGE_SIZE;
    },
    hasImageUrl() {
      return !isUndefinedOrNullOrEmpty(this.valueFormatted);
    },
  },
};
</script>
