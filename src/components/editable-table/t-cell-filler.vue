<template>
  <div
    class="t-cell-filler"
    v-on="$listeners"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: "t-cell-filler"
};
</script>

<style lang="scss">
.b-editable-table-wrapper {
  .t-cell-filler {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
