<template>
  <t-cell-filler :title="title">
    <div>{{ valueFormatted }}</div>
  </t-cell-filler>
</template>

<script>
import TCellFiller from "../editable-table/t-cell-filler";
import Column from '../../dto/Column';
import {Row} from '../../dto/index';

export default {
  name: 't-cell-typed',
  components: {
    TCellFiller,
  },
  props: {
    field: {type: Column, required: true},
    row: {type: Row, required: true},
    value: {type: [Object, String, Number], default: null},
    cell: {type: Object, default: null},
    cellComponentResolver: {type: Function, required: true},
  },
  data() {
    return {
      localValue: null,
    };
  },
  computed: {
    valueFormatted() {
      if ([undefined, null].includes(this.value)) return '';
      return this.value;
    },
    isNullIfValid() {
      return this.isValid ? null : false;
    },
    edit() {
      return !!this.cell;
    },
    isValid() {
      return this.cell ? this.cell.isValid : true;
    },
    title() {
      return this.isValid ? '' : `Expected data format: ${this.field.type}`;
    },
    cellComponent() {
      return this.cellComponentResolver(this.field);
    },
    cellComponentBindings() {
      if (this.cellComponent) {
        return {
          column: this.field,
          row: this.row,
          value: this.value,
          valueFormatted: this.valueFormatted,
          setValue: this.setValue,
          isEdit: this.edit,
          isValid: this.isValid
        };
      }
      return {};
    }
  },
  watch: {
    value() {
      this.updateLocalValue();
    },
    edit() {
      this.$nextTick(() => {
        const {input} = this.$refs;
        if (!input) return;
        input.focus();
      });
    }
  },
  created() {
    this.updateLocalValue();
  },
  methods: {
    setValue(value) {
      this.localValue = value;
      if (!this.cell || this.cell.isValid) {
        const externalValue = this.convertValueToExternal(value);
        this.$emit('change', externalValue);
      } else {
        this.$emit('change', null);
      }
    },
    convertValueToLocal(value) {
      return value;
    },
    convertValueToExternal(value) {
      return value;
    },
    updateLocalValue() {
      this.localValue = this.convertValueToLocal(this.value);
    }
  },
};
</script>
