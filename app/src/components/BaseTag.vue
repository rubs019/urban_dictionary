<template>
  <div class="tile">
    <article class="tile is-child notification is-white">
      <p class="title has-text-left">Top tags</p>
      <div class="subtitle has-text-left">
        <div class="tags">
          <BaseTagLabel
            v-for="(tag, index) in tags"
            :key="index"
            :name="tag"
          ></BaseTagLabel>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import BaseTagLabel from "./BaseTagLabel";
export default {
  name: "BaseTag",
  components: {
    BaseTagLabel
  },
  data: () => ({
    tags: [
      "Street",
      "Soleil",
      "Paris",
      "Musique",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
      "Twenty"
    ]
  })
};
</script>

<style scoped></style>
