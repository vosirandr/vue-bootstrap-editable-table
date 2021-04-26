<template>
  <b-modal
    ref="modal"
    title="Add a new column"
    visible
    @ok="handleOk"
    @hidden="$emit('close')"
  >
    <b-form ref="form" @submit.stop.prevent="submit">
      <b-form-group
        label="Type"
        invalid-feedback="Type is required"
        :state="validateState('type')"
      >
        <b-form-select
          v-model="form.type"
          :options="typesOptions"
          :state="validateState('type')"
        />
      </b-form-group>
      <b-form-group
        label="Name"
        invalid-feedback="Name is required"
        :state="validateState('title')"
      >
        <b-form-input
          v-model="form.title"
          :state="validateState('title')"
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {capitalize} from "../helpers";
import COLUMN_TYPES from '../services/column-types';

export default {
  name: 'add-column-modal',
  props: {
    types: {type: Array, required: true},
    fieldsLength: {type: Number, required: true}
  },
  data() {
    return {
      form: {
        type: COLUMN_TYPES.TEXT,
        title: `Column ${this.fieldsLength + 1}`,
      }
    };
  },
  computed: {
    typesOptions() {
      return this.types.map(type => ({value: type, text: capitalize(type)}));
    },
    valid() {
      return Object.values(COLUMN_TYPES).includes(this.form.type) && String(this.form.title).length >= 1;
    }
  },
  methods: {
    validateState(name) {
      let hasError = false;
      switch (name) {
        case 'type':
          hasError = !Object.values(COLUMN_TYPES).includes(this.form.type);
          break;
        case 'title':
          hasError = String(this.form.title).length === 0;
          break;
      }
      return hasError ? false : null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.submit();
    },
    submit() {
      if (!this.valid) return;

      this.$emit('submit', this.form);

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
