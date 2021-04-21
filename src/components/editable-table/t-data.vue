<template>
  <div
    class="td"
    :class="{ 'td-design': !empty, 'empty-td-design': empty }"
    :style="tdStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 't-data',
  props: {
    empty: {type: Boolean, default: false},
    width: Number,
  },
  computed: {
    tdStyle() {
      return {
        width: `${this.width}px`,
      };
    },
  },
};
</script>

<style>
.td {
  display: flex;
  position: relative;
  word-break: break-word;
  align-items: center;
  justify-content: center;
  /* overflow: auto; */
  text-overflow: ellipsis;
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
