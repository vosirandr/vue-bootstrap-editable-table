<template>
  <b-button
    class="small-button"
    variant="link"
    size="sm"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </b-button>
</template>

<script>
  export default {
    name: "small-button",
  };
</script>

<style scoped>
  .small-button {
    padding: 0;
    background-color: white;
    display: flex;
  }

  .small-button:hover {
    background-color: #bdbcbc;
  }
</style>
