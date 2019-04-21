<template>
  <router-link tag="span" to="/tag" class="tag is-light">{{
    name
  }}</router-link>
</template>

<script>
export default {
  name: "BaseTagLabel",
  props: {
    name
  }
};
</script>

<style scoped>
span:hover {
  cursor: pointer;
}
</style>
