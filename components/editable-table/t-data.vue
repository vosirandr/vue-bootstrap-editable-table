<template>
  <div
    class="td"
    :class="{ 'td-design': !empty, 'empty-td-design': empty }"
    :style="tdStyle"
    @click="$emit('click')"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 't-data',
  props: {
    grow: { type: Number, default: undefined },
    empty: { type: Boolean, default: false },
  },
  computed: {
    tdStyle() {
      return (this.grow === undefined) ? '' : `flex-grow: ${this.grow};`;
    },
  }
}
</script>

<style>
  .td {
    display: flex;
    word-break: break-word;
    align-items: center;
    justify-content: center;
    /* overflow: auto; */
    text-overflow: ellipsis;
    width: 150px;
    min-width: 0px;
    min-height: 38px;
    /* white-space: nowrap; */
  }

  .td-design {
    border-bottom: 1px solid #d0d0d0;
    border-right: 1px solid #d0d0d0;
  }

  .td-design:first-child {
    border-left: 1px solid #d0d0d0;
  }

  .empty-td-design {
    background-color: #ffffff;
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;
  }
</style>
