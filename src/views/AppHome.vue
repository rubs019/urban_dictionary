<template>
  <div class="home">
    <AppHeroComponent
      :app-name="AppName"
      :app-description="AppDescription"
    ></AppHeroComponent>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <p v-if="store.state.isConnected"> Welcome back, {{ store.credentials.username }} </p>
            <div class="expression" id="topExpression">
              <h3 class="title boxed-section-title is-4 has-text-left">
                Expression du jour
              </h3>
              <OneDefinition :is-primary="true" :simpleComponent="false"></OneDefinition>
            </div>
            <div class="expression" id="allExpression">
              <h3 class="title boxed-section-title is-4 has-text-left">
                Toutes les expressions
              </h3>
              <OneDefinition :is-primary="false" :simpleComponent="true"></OneDefinition>
            </div>
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
// @ is an alias to /src
import AppHeroComponent from "../components/heroComponent.vue"
import OneDefinition from "../components/definitions/OneDefinition"
import TheSidebar from "../components/generic/TheSidebar"
import { APP_NAME, APP_DESCRIPTION } from "../constants"
import Store  from "../store"

export default {
  name: "AppHome",
  data() {
    return {
      AppName: APP_NAME,
      AppDescription: APP_DESCRIPTION,
      OneDefinition: OneDefinition,
      store : Store
    }
  },
  components: {
    AppHeroComponent,
    OneDefinition,
    TheSidebar
  }
}
</script>

<style>
  .expression {
    padding: 40px 0;
  }
</style>
