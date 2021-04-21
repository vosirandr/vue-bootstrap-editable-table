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
      >
        <b-form-select
          v-model="$v.form.type.$model"
          :options="typesOptions"
          :state="validateState('type')"
        />
      </b-form-group>
      <b-form-group
        label="Name"
        invalid-feedback="Name is required"
      >
        <b-form-input
          v-model="$v.form.name.$model"
          :state="validateState('name')"
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {capitalize} from "../helpers";

export default {
  name: 'add-column-modal',
  mixins: [validationMixin],
  props: {
    columnTypes: Array,
    form: Object
  },
  data() {
    return {};
  },
  validations: {
    form: {
      type: {required},
      name: {required},
    }
  },
  computed: {
    types() {
      return this.columnTypes.map(({type}) => type);
    },
    typesOptions() {
      return this.types.map(type => ({value: type, text: capitalize(type)}));
    }
  },
  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.submit();
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      this.$emit('submit', this.form);

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
