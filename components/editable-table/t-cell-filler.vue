<template>
  <div
    class="t-cell-filler"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    name: "t-cell-filler"
  }
</script>

<style>
  .t-cell-filler {
    width: 100%;
    height: 100%;
  }
</style>
