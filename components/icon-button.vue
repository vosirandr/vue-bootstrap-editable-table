<template>
  <button class="icon-button" type="button" @click="$emit('click', $event)">
    <b-img rounded src="~/assets/icons/remove.svg" width="15" height="15" alt="del"/>
  </button>
</template>

<script>
export default {
};
</script>

<style>
  .icon-button {
    padding: 0px;
    border: 0px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button:focus {
    outline: 0;
  }

  .icon-button:last-of-type {
    margin-right: 0px;
  }

  .icon-button > svg {
    width: 16px;
    height: 16px;
    fill: #A3A6B4;
  }

  .icon-button > svg:hover {
    fill: #F5F6FA;
  }
</style>
