<template>
  <div class="table-value">
    <b-img
      v-if="hasImageUrl"
      :src="value"
      :height="imageSize.height"
      :width="imageSize.width"
    />

    <b-form-textarea
      v-else-if="edit && field.type === 'text'"
      :value="localValue"
      @click.stop="onEditorClick"
      size="sm"
      rows="2"
      max-rows="3"
      :state="isValidValue"
      @change="onChangeValue"
      @input="onInputValue"
    />

    <b-form-input
      v-else-if="edit && field.type === 'number'"
      :value="localValue"
      :state="isValidValue"
      @click.stop="onEditorClick"
      @change="onChangeValue"
      @input="onInputValue"
    />

    <span v-else>
      {{(value === undefined) ? '' : formatValue}}
    </span>
  </div>
</template>

<script>
import {
  isFunction,
  formatFloat,
  validateType,
  unFormatFloat,
  isUndefinedOrNullOrEmpty,
} from '~/helpers';

const DEFAULT_IMAGE_SIZE = { width: 40, height: 40 };

export default {
  name: 't-value',
  props: ['value', 'field', 'edit'],
  data() {
    return {
      localValue: this.value,
      isValidValue: true
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
    formatValue() {
      if (this.field.type === 'number') {
        return formatFloat(this.value);
      } else {
        return this.value;
      }
    }
  },
  methods: {
    onEditorClick() {},
    onChangeValue(value) {
      if (this.isValidValue) {
        this.localValue = value;
        this.$emit('change', value);
      }
    },
    onInputValue(value) {
      const isValid = this.validate(value);

      if (this.isValidValue !== isValid) {
        this.isValidValue = isValid;
        this.$emit('change-valid', isValid);
      }
    },
    validate(value) {
      let val = value;
      if (this.field.type === 'number') {
        val = unFormatFloat(val);
      }

      return validateType(this.field.type, val);
    },
  }
}
</script>

<style>
  .table-value {
    flex-grow: 1;
  }
</style>
