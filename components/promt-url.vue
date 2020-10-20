<template>
  <b-modal
    ref="modal"
    title="Enter HTTP image addres"
    visible
    :ok-disabled="!isValid"
    @ok="submit"
    @hidden="$emit('close')"
  >
    <form @submit.stop.prevent="submit">
      <b-form-group
        :state="isValid"
        label="URL"
        invalid-feedback="Valid URL is required"
      >
        <b-form-input
          v-model="value"
          :state="isValid"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
  import { validateType } from '~/helpers';

  export default {
    name: "promt-url",
    props: {
      url: String,
    },
    data() {
      return {
        value: this.url,
      }
    },
    computed: {
      isValid () {
        return validateType('url',  this.value);
      },
    },
    methods: {
      submit() {
        this.$emit('submit', this.value);
        this.$refs.modal.hide();
      }
    }
  }
</script>
