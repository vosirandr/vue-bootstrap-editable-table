<template>
  <div class="t-editable-label" :class="{'t-editable-label--active': active}" @click="setActive">
    <span>{{ label }}</span>
    <input
      v-if="active"
      ref="input"
      v-model="label"
      @focusout="setInactive"
      @keyup.enter="active = false"
    >
  </div>
</template>

<script>
export default {
  name: "t-editable-label",
  props: {
    value: {type: String, default: ''},
  },
  data() {
    return {
      label: this.value,
      active: false,
    };
  },
  methods: {
    async setActive() {
      this.active = true;
      await this.$nextTick();
      this.$refs.input.focus();
    },
    setInactive() {
      this.active = false;
      if (this.label === this.value) return;
      this.$emit('input', this.label);
    },
  }
};
</script>

<style>
.t-editable-label {
  position: relative;
  max-width: 100%;
  border-bottom: 1px dashed black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.t-editable-label:hover {
  background: #ddd;
}

.t-editable-label span {
  z-index: 1;
}

.t-editable-label input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  opacity: 0;
  z-index: 0;
}

.t-editable-label input:focus {
  outline: none;
}

.t-editable-label--active input {
  z-index: 2;
  opacity: 1;
}

.t-editable-label--active span {
  opacity: 0;

}
</style>
