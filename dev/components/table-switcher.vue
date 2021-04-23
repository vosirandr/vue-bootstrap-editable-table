<template>
  <div>
    <b-button @click="switchMode" size="sm" class="mb-3">
      {{ jsonMode ? 'Return to table view' : 'Switch JSON mode' }}
    </b-button>
    <editable-table v-if="!jsonMode" :general-field="generalField" :fields="fields" :rows="rows" v-bind="$attrs" v-on="$listeners"/>
    <vue-json-editor v-else :value="json"/>
  </div>
</template>

<script>
import {VueEditableTable} from "../../src/index";

export default {
  name: "table-switcher",
  components: {EditableTable: VueEditableTable},
  props: {
    generalField: {type: String, required: true},
    fields: {type: Array, required: true},
    rows: {type: Array, required: true},
  },
  data() {
    return {
      jsonMode: false,
    };
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
};
</script>
