<template>
  <div class="tile is-child notification is-white">
    <p class="title has-text-left">{{ nameTop }}</p>
    <div class="subtitle has-text-left">
      <div class="tags">
        <div class="content">
          <template v-if="expressions && expressions.length > 0">
            <ol start="1">
              <router-link
                      tag="li"
                      v-for="(expression, index) in expressions"
                      :key="index"
                      :to="{ name: 'OneDefinition', params: { name: expression.name } }"
              >
                {{ expression.name }}
              </router-link>
            </ol>
          </template>
          <template v-else>
            <p>Pas encore d'expressions...</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopExpressions",
  props: {
    expressions: Array,
    url: String,
    nameTop: String
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
li:hover {
}
</style>
