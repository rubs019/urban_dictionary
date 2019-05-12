<template>
  <div id="app-definitions">
    <section class="section">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div id="search">
          <SearchComponent border="true"></SearchComponent>
        </div>
      </div>
    </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <router-view />
          </div>
          <div class="column is-4">
            <TheSidebar></TheSidebar>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SearchComponent from "../components/searchComponent"
import TheSidebar from "../components/generic/TheSidebar"
import Store from "../store"

export default {
  name: "AppDefinitions",
  components: { SearchComponent, TheSidebar },
  data: () => ({
    store: Store,
  })
}
</script>

<style scoped lang="scss">
#search {
  margin: 1em 0;
}
</style>
