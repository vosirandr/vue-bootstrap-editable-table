<template>
  <div class="table-value">
    {{formatValue}}
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
    setValue(value) {
      this.checkValid(value);
      if (this.isValidValue) {
        this.$emit('change', value);
      }
    },
    checkValid(value) {
      if (this.isValidValue !== this.validate(value)) {
        this.isValidValue = !this.isValidValue;
        this.$emit('change-valid', this.isValidValue);
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
