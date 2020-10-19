<template>
  <t-data
    :grow="field.grow"
    @click="$emit('click')"
  >
    <b-img
      v-if="hasImageUrl"
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />
  </t-data>
</template>

<script>
  import {
    isUndefinedOrNullOrEmpty,
  } from '~/helpers';
  import tValue from './t-value';

  const DEFAULT_IMAGE_SIZE = { width: 40, height: 40 };

  export default {
    name: 't-image-value',
    extends: tValue,
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
  }
</script>
