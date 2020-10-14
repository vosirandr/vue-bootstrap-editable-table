<template>
  <b-modal
    id="modal-promt-name"
    ref="modal-promt-name"
    title="Enter column name"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="nameState"
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          :state="nameState"
          required
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
  export default {
    props: {
      value: { type: String }
    },
    data() {
      return {
        name: this.value,
        nameState: null,
        callback: null
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        this.$emit('input', this.name);
        this.$emit('change', this.name);

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-promt-name')
        })
      }
    }
  }
</script>
