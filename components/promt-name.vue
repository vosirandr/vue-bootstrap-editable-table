<template>
  <b-modal
    ref="modal"
    title="Enter column name"
    visible
    :ok-disabled="!isValid"
    @ok="handleOk"
    @hidden="$emit('close')"
  >
    <form ref="form" @submit.stop.prevent="submit">
      <b-form-group
        :state="isValid"
        label="Name"
        invalid-feedback="Name is required"
      >
        <b-form-input
          v-model="value"
          :state="isValid"
          @input="checkFormValidity"
          required
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        isValid: true,
      }
    },
    methods: {
      checkFormValidity () {
        this.isValid = this.$refs.form.checkValidity();
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.submit();
      },
      submit() {
        this.checkFormValidity();
        if (!this.isValid) return;

        this.$emit('submit', this.value);
        this.$nextTick(() => {
          this.$refs.modal.hide();
        });
      }
    }
  }
</script>
