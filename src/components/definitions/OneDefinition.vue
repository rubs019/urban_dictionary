<template>
  <div class="one-definitions">

    <template v-if="definition">
      <div class="tile is-parent">
        <article
                class="tile is-child notification"
                v-bind:class="[isPrimary ? 'is-primary' : ''  ]">
          <div class="level">
            <div class="level-left">
              <div class="item">
                <router-link
                  class="title"
                  :to="{ name: 'OneDefinition', params: { name: definition.name } }">{{ definition.name }}
                  </router-link>
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
                      <span class="icon">
                          <i class="fas fa-flag" aria-hidden="true"></i>
                        </span>
                      Autre langue
                    </a>
                    <a href="#" class="dropdown-item">
                      <span class="icon">
                        <i class="fas fa-book"></i>
                      </span>
                      Proposez une définition
                    </a>
                    <a href="" class="dropdown-item">
                      <span class="icon">
                        <i class="fas fa-volume-up"></i>
                      </span>
                      Ecouter l'audio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-link
            tag="p"
            class="subtitle has-text-left is-size-6"
            v-if="!simpleComponent"
            :to="{ name: 'OneDefintion', params: { name: definition.user.pseudo } }">@{{ definition.user.pseudo }}</router-link>
          <div class="content has-text-left">
            <!-- Content -->
            {{ definition.definition }}
          </div>
          <div v-if="!simpleComponent" id="tag-items" class="has-text-left">
            <span id="label-items" v-for="(label, index) in definition.tags" :key="index">
              <BaseTagLabel :name="label"></BaseTagLabel>
            </span>
          </div>
          <BaseVoteHorizontal :nb-vote="definition.like"></BaseVoteHorizontal>
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
</template>

<script>
import BaseVoteHorizontal from "./BaseVoteHorizontal"
import BaseTagLabel from "../BaseTagLabel"

export default {
  name: "OneDefinitions",
  components: { BaseVoteHorizontal, BaseTagLabel },
  props: {
    isPrimary: Boolean,
    simpleComponent: Boolean
  },
  data: () => ({
    definition: null
  }),
  async mounted() {
    this.getDefinition()
  },
  methods: {
    async getDefinition() {
      const nameDefinition = this.$route.params.name
      try {
        /*const definition = await APIService.get(
          `${ENDPOINT}/${nameDefinition}`
        )
        this.definition = definition.data*/
        setTimeout(() => {
          this.definition = {
            name: "Afrotrap",
            definition: "L’ afrotrap n’est autre qu’un mélange de sonorité africaine et de texte trap, lequel est un type d’instrumentale assez lente qui oblige  le rappeur à lâcher ses textes de façon plus rapide que sur une prod au BPM classique. \n" + "Ce style musical existait déjà, mais MHD est le premier à le baptiser.",
            user: {
              pseudo: "John DOE"
            },
            like: 1252,
            tags: ['Street', 'Musique', 'Paris', '2019']
          }
        }, 1500)
      } catch (err) {
        console.log('err', err)
        this.definition = {
          name: "Oups...",
          definition: "La défintion que vous cherchez n'existe pas :("
        }
      }
    },
    updateNbVote(nbVote) {
      // Use to update the new nb vote
      // Make a request to server
      console.log("Nouveau nb de vote = ", nbVote)
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
p {
  cursor: pointer;
}
#tag-items {
  margin: 5px 0;
  span {
    margin: 0 .2em;
  }
}
</style>
