<template>
  <form class="form">
    <input
      class="input"
      type="text"
      placeholder="Type a message ..."

    />
    <button
      type="button"
      class="send__btn">
      Send</button>

  </form>
</template>

<script>
export default {
  name: 'MessageInput',
  props: {
    msg: String,
  },
};
</script>

<style>

</style>
