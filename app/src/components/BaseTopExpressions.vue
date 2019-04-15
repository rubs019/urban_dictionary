<template>
  <article class="tile is-child notification is-white">
    <p class="title has-text-left">Top Expressions</p>
    <div class="subtitle has-text-left">
      <div class="tags">
        <div class="content">
          <ol start="1">
            <router-link
              tag="li"
              v-for="(expressionName, index) in expressionsNames"
              :key="index"
              :to="{ name: 'OneDefinition', params: { name: expressionName } }"
            >
              {{ expressionName }}
            </router-link>
          </ol>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "BaseTopExpressions",
  props: {
    expressionsNames: Array,
    url: String
  }
};
</script>

<style scoped>
li {
  cursor: pointer;
}
li:hover {
}
</style>
