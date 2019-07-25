<template>
  <div class="tile">
    <article class="tile is-child notification is-white">
      <p class="title has-text-left">Top tags</p>
      <div class="subtitle has-text-left">
        <div class="tags">
          <BaseLabel
            v-for="(tag, index) in tags"
            :key="index"
            :name="tag"
            :colors="false"
          ></BaseLabel>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import BaseLabel from "./BaseLabel"
export default {
  name: "BaseTag",
  components: {
    BaseLabel
  },
  props: {
    tags: Array
  }
}
</script>

<style scoped></style>
