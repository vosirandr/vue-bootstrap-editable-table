<template>
  <div class="table-value">
    <b-form-textarea
      v-if="edit"
      :value="localValue"
      size="sm"
      rows="2"
      max-rows="3"
      :state="isValidValue"
      @change="onChangeValue"
      @input="onInputValue"
    />

    <span v-else>{{formatValue}}</span>
  </div>
</template>

<script>
  import tValue from './t-value';

  export default {
    name: 't-text-value',
    extends: tValue,
  }
</script>
