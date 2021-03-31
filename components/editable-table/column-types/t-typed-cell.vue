<template>
  <t-cell-filler>
    <div>{{formatValue}}</div>
  </t-cell-filler>
</template>

<script>
import TCellFiller from "../t-cell-filler";

export default {
  name: 't-typed-cell',
  props: ['value', 'field', 'cell'],
  components: {
    TCellFiller,
  },
  data() {
    return {
      localValue: null,
    }
  },
  computed: {
    formatValue() {
      if (this.value === undefined) return '';
      return this.value;
    },
    isNullIfValid () {
      return this.isValid ? null : false;
    },
    edit() {
      return !!this.cell;
    },
    isValid() {
      return this.cell ? this.cell.isValid : true;
    }
  },
  methods: {
    setValue(value) {
      this.localValue = value;
      if (!this.cell || this.cell.isValid) {
        const externalValue = this.convertValueToExternal(value);
        this.$emit('change', externalValue);
      } else {
        this.$emit('change', undefined);
      }
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
    edit () {
      this.$nextTick(() => {
        const { input } = this.$refs;
        if (!input) return;
        input.focus();
      })
    }
  },
  created () {
    this.updateLocalValue();
  }
}
</script>
