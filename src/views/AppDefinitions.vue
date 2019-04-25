<template>
  <div id="app-definitions">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <div id="search">
              <SearchComponent border="true"></SearchComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import SearchComponent from "../components/searchComponent"
export default {
  name: "AppDefinitions",
  components: { SearchComponent }
}
</script>

<style scoped lang="scss">
#search {
  margin: 1em 0;
}
</style>
