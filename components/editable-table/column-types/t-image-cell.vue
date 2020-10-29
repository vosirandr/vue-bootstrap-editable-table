<template>
  <t-data
    :width="field.width"
    @click="$emit('click')"
  >
    <b-form-input
      v-if="edit"
      v-model="localValue"
      :state="isNullIfValid"
      @change="setValue"
      @input="checkValid"
    />

    <b-img
      v-else-if="hasImageUrl"
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />
  </t-data>
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
        return (isUndefinedOrNullOrEmpty(this.field.imageSize)
          ? DEFAULT_IMAGE_SIZE
          : this.field.imageSize
        );
      },
      hasImageUrl() {
        return (
          this.field.type === 'image' &&
          !isUndefinedOrNullOrEmpty(this.value)
        );
      },
    },
    methods: {
      validate(value) {
        return validateType('url', value);
      },
    }
  }
</script>
