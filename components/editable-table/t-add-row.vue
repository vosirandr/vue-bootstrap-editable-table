<template>
  <div class="tr">
    <t-data
      v-for="field in fields"
      :key="field.name"
      :grow="field.grow"
      :empty="field.name !== 'name'"
    >
      <b-button
        v-if="field.name === 'name'"
        class="text-decoration-none"
        size="sm"
        variant="link"
        @click="$emit('add-row')"
      >Add row</b-button>
    </t-data>

    <t-data empty>
    </t-data>
  </div>
</template>

<script>
import tData from './t-data.vue'

export default {
  name: 't-add-row',
  components: {
    tData
  },
  props: {
    fields: { type: Array, required: true }
  }
}
</script>
