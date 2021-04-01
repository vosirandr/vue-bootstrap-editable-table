<template>
  <small-button v-bind="$attrs" v-on="$listeners">
    <b-icon icon="x" />
  </small-button>
</template>

<script>
  import SmallButton from "./small-button";
  export default {
    name: "delete-button",
    components: {SmallButton}
  }
</script>
