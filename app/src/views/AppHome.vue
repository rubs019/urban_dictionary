<template>
  <div class="home">
    <AppHeroComponent></AppHeroComponent>
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
                <BaseTag :tags="tags"></BaseTag>
              </div>
              <div class="tile is-parent">
                <BaseTopExpressions
                  :expressions-names="expressions"
                  v-bind:url="'OneDefinition'"
                ></BaseTopExpressions>
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
import AppHeroComponent from "../components/heroComponent.vue";
import BaseTag from "../components/BaseTag.vue";
import BaseTopExpressions from "../components/BaseTopExpressions.vue";
import { APP_NAME } from "../constants";

export default {
  name: "AppHome",
  data() {
    return {
      AppName: APP_NAME,
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
        "Nineteen"
      ],
      expressions: [
        "Tchoin",
        "au DD",
        "Gava",
        "Bavon",
        "Brava",
        "En esprit",
        "Un Fer",
        "Un guigui"
      ]
    };
  },
  components: {
    AppHeroComponent,
    BaseTag,
    BaseTopExpressions
  }
};
</script>
