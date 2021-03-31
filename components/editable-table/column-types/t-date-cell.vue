<template>
  <t-cell-filler
    class="t-date-cell"
    @click="$emit('switch-edit-mode')"
  >
    <b-input-group v-if="edit" @click.stop>
      <b-form-input
        ref="input"
        id="example-input"
        v-model="localValue"
        type="text"
        size="sm"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
        @change="setValue"
        @input="$emit('validate', $event)"
      />
      <b-input-group-append @click.stop>
        <b-form-datepicker
          v-model="localValue"
          button-only
          right
          size="sm"
          locale="en-US"
          @input="setValue"
        />
      </b-input-group-append>
    </b-input-group>

    <span v-else>{{formatValue}}</span>
  </t-cell-filler>
</template>

<script>
  import moment from 'moment';
  import tTypedCell from './t-typed-cell';

  export default {
    name: 't-date-cell',
    extends: tTypedCell,
    computed: {
      formatValue() {
        if (!this.value) return '';
        return moment(this.value).format('D MMM YYYY');
      }
    },
  }
</script>

<style>
  .t-date-cell label.form-control {
    display: none;
  }
</style>
