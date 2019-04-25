<template>
  <div class="one-definitions">
    <!--<section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <template v-if="definition">
            <h1 class="title">
              {{ definition.name }}
            </h1>
            <h2 class="subtitle">
              {{ definition.definition }}
            </h2>
          </template>
          <template v-else>
            <h1 class="title">
              Chargement...
            </h1>
            <h2 class="subtitle">
              <span class="loader"></span>
            </h2>
          </template>
        </div>
      </div>
    </section>-->
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <template v-if="definition">
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <div class="level">
                <div class="level-left">
                  <div class="item">
                    <p class="title">{{ definition.name }}</p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                      <div
                        class="dropdown-definition"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu4"
                      >
                        <span class="icon">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                      <div class="dropdown-content">
                        <a href="#" class="dropdown-item">
                          Autre langue
                        </a>
                        <a href="#" class="dropdown-item">
                          Proposez une définition
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="subtitle has-text-left">@{{ definition.author }}</p>
              <div class="content has-text-left">
                <!-- Content -->
                {{ definition.definition }}
              </div>
              <nav class="level">
                <div class="level-item button has-text-centered is-primary">
                  <span class="icon">
                    <i class="fas fa-arrow-up"></i>
                  </span>
                  <span>Upvote</span>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Vote</p>
                    <p class="title">{{ definition.like }}</p>
                  </div>
                </div>
                <div class="level-item button has-text-centered is-primary">
                  <span class="icon">
                    <i class="fas fa-arrow-down"></i>
                  </span>
                  <span>Downvote</span>
                </div>
              </nav>
            </article>
          </div>
        </template>
        <template v-else>
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <p class="title">Chargement...</p>
              <p class="subtitle left"><span class="loader"></span></p>
            </article>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as APIService from "../../services/api.service"
const ENDPOINT = "definitions"

export default {
  name: "OneDefinitions",
  data: () => ({
    definition: null
  }),
  async mounted() {
    console.log("mounted")
    this.getDefinition()
  },
  methods: {
    async getDefinition() {
      const nameDefinition = this.$route.params.name
      try {
        const definition = await APIService.get(
          `${ENDPOINT}/${nameDefinition}`
        )
        this.definition = definition.data
      } catch (err) {
        this.definition = {
          name: "Oups...",
          definition: "La défintion que vous cherchez n'existe pas :("
        }
      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log(to, from)
    this.definition = null
    await this.getDefinition()
    console.log("done")
    next()
  }
}
</script>

<style scoped lang="scss">
.media {
  border: 1px solid #e1e1e1;
  box-shadow: 0 1px 0 0 #e1e1e1;
  border-radius: 4px;
  padding: 5px;
}
.media .content:not(:last-child) {
  margin: 0;
}
.loading {
  display: block;
}
.title,
.subTitle {
  text-align: left;
}
.dropdown-definition {
  cursor: pointer;
}
</style>
