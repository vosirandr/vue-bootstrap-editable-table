<template>
  <t-cell-filler
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
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />
  </t-cell-filler>
</template>

<script>
  import {isUndefinedOrNullOrEmpty} from '~/helpers';
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
  }
</script>
