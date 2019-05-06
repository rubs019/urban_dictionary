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
            <div id="topExpression">
              <h3 class="title boxed-section-title is-4 has-text-left">
                Expression du jour
              </h3>
              <OneDefinition></OneDefinition>
            </div>
            <div id="allExpression">
              <h3 class="title boxed-section-title is-4 has-text-left">
                Toutes les expressions
              </h3>
              <OneDefinition></OneDefinition>
            </div>
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
                <TopExpressions
                  :expressions-names="rawExpressions"
                  v-bind:url="'OneDefinition'"
                ></TopExpressions>
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
import AppHeroComponent from "../components/heroComponent.vue"
import OneDefinition from "../components/definitions/OneDefinition"
import BaseTag from "../components/BaseTag.vue"
import TopExpressions from "../components/TopExpressions.vue"
import { APP_NAME, APP_DESCRIPTION } from "../constants"

export default {
  name: "AppHome",
  data() {
    return {
      AppName: APP_NAME,
      AppDescription: APP_DESCRIPTION,
      OneDefinition: OneDefinition,
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
      rawExpressions: [
        "Tchoin",
        "au DD",
        "Gava",
        "Bavon",
        "Brava",
        "En esprit",
        "Un Fer",
        "Un guigui"
      ]
    }
  },
  components: {
    AppHeroComponent,
    BaseTag,
    TopExpressions,
    OneDefinition
  }
}
</script>
