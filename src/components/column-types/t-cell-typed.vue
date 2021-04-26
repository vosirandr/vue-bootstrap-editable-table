<template>
  <t-cell-filler :title="title">
    <div>{{ formatValue }}</div>
  </t-cell-filler>
</template>

<script>
import TCellFiller from "../editable-table/t-cell-filler";
import Column from '../../dto/Column';

export default {
  name: 't-cell-typed',
  components: {
    TCellFiller,
  },
  props: {
    field: {type: Column, required: true},
    value: {type: [Object, String, Number], default: null},
    cell: {type: Object, default: null},
    cellEditorComponent: {type: Function, required: true},
  },
  data() {
    return {
      localValue: null,
    };
  },
  computed: {
    formatValue() {
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
    editorComponent() {
      return this.cellEditorComponent(this.field);
    },
    editorComponentBindings(){
      return {
        column: this.field,
        value: this.value,
        setValue: this.setValue,
        valid: this.isValid
      };
    }
  },
  watch: {
    'value.value'() {
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
