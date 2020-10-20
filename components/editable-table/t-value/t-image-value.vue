<template>
  <t-data
    :grow="field.grow"
    @click="modalShown = true"
  >
    <b-img
      v-if="hasImageUrl"
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />

    <promt-url
      ref="modal"
      v-if="modalShown"
      :url="value"
      @submit="setValue"
      @close="modalShown = false"
    />
  </t-data>
</template>

<script>
  import PromtUrl from '~/components/promt-url.vue';
  import {
    isUndefinedOrNullOrEmpty,
  } from '~/helpers';
  import tValue from './t-value';

  const DEFAULT_IMAGE_SIZE = { width: 40, height: 40 };

  export default {
    name: 't-image-value',
    extends: tValue,
    components: {
      PromtUrl,
    },
    data () {
      return {
        modalShown: false,
      }
    },
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
