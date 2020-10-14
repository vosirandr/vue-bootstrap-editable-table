<template>
  <b-modal
    id="modal-promt-url"
    ref="modal-promt-url"
    title="Enter HTTP image addres"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="urlState"
        label="URL"
        label-for="url-input"
        invalid-feedback="Valid URL is required"
      >
        <b-form-input
          id="url-input"
          v-model="url"
          :state="urlState"
          required
          @input="onInputValue"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
  import { validateType } from '~/helpers';

  export default {
    props: {
      value: { type: Object },
    },
    data() {
      return {
        url: this.value.value,
        field: this.value.field,
        urlState: null
      }
    },
    methods: {
      checkFormValidity() {
        const isValid = validateType(this.field.type,  this.url);
        this.urlState = isValid;

        return isValid;
      },
      onInputValue(value) {
        const isValid = this.checkFormValidity();
      },
      resetModal() {
        this.url = this.value.value;
        this.field = this.value.field;
        this.urlState = null;
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
      },
      handleSubmit() {
        if (!this.checkFormValidity()) return;

        this.$emit('change', { fieldName: this.value.field.name, rowName: this.value.rowName, value: this.url });

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-promt-url');
        });
      }
    }
  }
</script>
