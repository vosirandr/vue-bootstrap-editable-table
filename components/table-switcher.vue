<template>
  <div>
    <button @click="switchMode">Switch JSON mode</button>
    <editable-table v-if="!jsonMode" :fields="fields" :rows="rows" v-bind="$attrs" v-on="$listeners" />
    <vue-json-editor v-else :value="json" />
  </div>
</template>

<script>
import EditableTable from "./editable-table";

export default {
  name: "table-switcher",
  components: {EditableTable},
  props: {
    fields: { type: Array, required: true },
    rows: { type: Array, required: true },
  },
  data() {
    return {
      jsonMode: false,
    }
  },
  computed: {
    json() {
      return {
        fields: this.fields,
        rows: this.rows,
      };
    }
  },
  methods: {
    switchMode() {
      this.jsonMode = !this.jsonMode;
      if (!this.jsonMode) this.validation();
    },
    validation() {
      return typeof (this.json) === 'object';
    }
  }
}
</script>
