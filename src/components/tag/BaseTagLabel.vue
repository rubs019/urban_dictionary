<template>
  <b-tag rounded :type="[colors ? 'is-info' : 'is-light']">{{ name }}</b-tag>
</template>

<script>
export default {
  name: "BaseTagLabel",
  props: {
    name: String,
    colors: Boolean
  }
}
</script>

<style scoped>
span:hover {
  cursor: pointer;
}
</style>
