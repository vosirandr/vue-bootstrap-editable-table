<template>
  <t-cell-filler
    @click="$emit('switch-edit-mode')"
  >
    <b-input-group v-if="edit" >
      <b-form-input
        id="example-input"
        v-model="localValue"
        type="text"
        size="sm"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
        @change="setValue"
        @input="checkValid"
      />
      <b-input-group-append @click.stop="() => {}">
        <b-form-datepicker
          v-model="localValue"
          button-only
          right
          size="sm"
          locale="en-US"
          aria-controls="example-input"
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
