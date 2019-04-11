<template>
  <div class="home">
    <HeroComponent></HeroComponent>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h3 class="title boxed-section-title is-4 has-text-left">
              Expression du jour
            </h3>
          </div>
          <div class="column is-4">
            <div class="sidebar">
              <div class="tile is-parent">
                <router-link
                  to="/connect"
                  class="button is-primary is-fullwidth"
                >
                  Lancer une partie
                </router-link>
              </div>
              <div class="tile is-parent">
                <BaseTag></BaseTag>
              </div>
              <div class="tile is-parent">
                <BaseTopExpressions></BaseTopExpressions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroComponent from "../components/heroComponent.vue";
import BaseTag from "../components/BaseTag.vue";
import BaseTopExpressions from "../components/BaseTopExpressions.vue";
import { APP_NAME } from "../constants";

export default {
  name: "AppHome",
  data() {
    return {
      AppName: APP_NAME
    };
  },
  components: {
    HeroComponent,
    BaseTag,
    BaseTopExpressions
  }
};
</script>
