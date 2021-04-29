<template>
  <component
    v-if="cellComponent"
    :is="cellComponent"
    v-bind="cellComponentBindings"
    v-on="$listeners"
  />
  <t-cell-filler
    v-else
    class="t-date-cell"
    :title="title"
    @click="$emit('switch-edit-mode')"
  >
    <b-input-group v-if="edit" @click.stop>
      <b-form-input
        ref="input"
        id="example-input"
        v-model="localValue"
        :state="isNullIfValid"
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

    <span v-else>{{ valueFormatted }}</span>
  </t-cell-filler>
</template>

<script>
import moment from 'moment';
import tTypedCell from './t-cell-typed';

export default {
  name: 't-cell-date',
  extends: tTypedCell,
  computed: {
    valueFormatted() {
      if (!this.value) return '';
      return moment(this.value).format('D MMM YYYY');
    }
  },
};
</script>

<style>
.t-date-cell label.form-control {
  display: none;
}
</style>
