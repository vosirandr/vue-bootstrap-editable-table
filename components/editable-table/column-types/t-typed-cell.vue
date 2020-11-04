<template>
  <t-cell-filler>
    <div>{{formatValue}}</div>
  </t-cell-filler>
</template>

<script>
import TCellFiller from "../t-cell-filler";
import {
  validateType,
} from '~/helpers';

export default {
  name: 't-typed-cell',
  props: ['value', 'field', 'edit'],
  components: {
    TCellFiller,
  },
  data() {
    return {
      localValue: null,
      isValidValue: true
    }
  },
  computed: {
    formatValue() {
      if (this.value === undefined) return '';
      return this.value;
    },
    isNullIfValid () {
      return this.isValidValue ? null : false;
    }
  },
  methods: {
    setValue(value) {
      this.checkValid(value);
      if (this.isValidValue) {
        const externalValue = this.convertValueToExternal(value);
        this.$emit('change', externalValue);
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
    convertValueToLocal (value) {
      return value;
    },
    convertValueToExternal (value) {
      return value;
    },
    updateLocalValue () {
      this.localValue = this.convertValueToLocal(this.value);
    }
  },
  watch: {
    value () {
      this.updateLocalValue();
    },
  },
  created () {
    this.updateLocalValue();
  }
}
</script>
