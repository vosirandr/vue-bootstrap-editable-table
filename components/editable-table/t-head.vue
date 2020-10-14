<template>
  <div class="tr th">
    <t-data
      v-for="field in fields"
      :key="field.name"
      :grow="field.grow"
    >
      <button
        v-if="field.name !== 'name' && deleteMode"
        class="clear-btn-style del-btn top-position"
        @click="onClickDelete(field.name)"
      />

      {{field.caption}}
    </t-data>

    <t-data>
      <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          Add column
        </template>

        <b-dropdown-item
          v-for="type in types"
          :key="type"
          @click="$emit('add-col', type)"
        >
          {{ type | capitalize }}
        </b-dropdown-item>
      </b-dropdown>

      <icon-button style="margin-left: 10px;" @click="$emit('delete-mode', !deleteMode)" />
    </t-data>
  </div>
</template>

<script>
import tData from './t-data.vue';
import IconButton from '~/components/icon-button.vue';

export default {
  name: 't-head',
  components: {
    tData,
    IconButton
  },
  props: {
    fields: { type: Array, required: true },
    deleteMode: { type: Boolean, default: false }
  },
  data () {
    return {
      types: ['text', 'image', 'number'],
    }
  },
  methods: {
    onClickDelete(fieldName) {
      this.$emit('del-col', fieldName);
    },
  }
}
</script>

<style>
  .th {
    display: none;
    font-weight: 700;
    background-color: #dee2e6;
  }

  .th > .td {
    white-space: normal;
    justify-content: center;
    border-top: 1px solid #d0d0d0;
  }
</style>
