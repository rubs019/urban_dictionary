<template>
  <div id="app-definitions">
    <AppHeroComponent
            :app-name="AppName"
            :app-description="AppDescription"
    ></AppHeroComponent>
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
import AppHeroComponent from "../components/AppHeroComponent"
import TheSidebar       from "../components/generic/TheSidebar"
import Store            from "../store"

export default {
  name: "AppDefinitions",
  components: { AppHeroComponent, TheSidebar },
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
