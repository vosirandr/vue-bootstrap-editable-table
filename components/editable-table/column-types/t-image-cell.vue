<template>
  <t-cell-filler
    @click="$emit('switch-edit-mode')"
  >
    <b-form-input
      v-if="edit"
      v-model="localValue"
      :state="isNullIfValid"
      @change="setValue"
      @input="checkValid"
      @click.stop
    />

    <b-img
      v-else-if="hasImageUrl"
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />
  </t-cell-filler>
</template>

<script>
  import {
    validateType,
    isUndefinedOrNullOrEmpty,
  } from '~/helpers';
  import tTypedCell from './t-typed-cell';

  const DEFAULT_IMAGE_SIZE = { width: 40, height: 40 };

  export default {
    name: 't-image-cell',
    extends: tTypedCell,
    computed: {
      imageSize() {
        return DEFAULT_IMAGE_SIZE;
      },
      hasImageUrl() {
        return !isUndefinedOrNullOrEmpty(this.value);
      },
    },
    methods: {
      validate(value) {
        return validateType('url', value);
      },
    }
  }
</script>
