<template>
  <div class="table-value">
    <span>{{formatValue}}</span>
  </div>
</template>

<script>
import {
  validateType,
} from '~/helpers';

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
    formatValue() {
      if (this.value === undefined) return '';
      return this.value;
    }
  },
  methods: {
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
      return validateType(this.field.type, value);
    },
  }
}
</script>

<style>
  .table-value {
    flex-grow: 1;
  }
</style>
