<template>
  <div class="one-definitions">

    <template v-if="definition">
      <article class="message is-primary">
        <div class="message-body">
          <div class="columns">
            <div class="column is-10">
              <div class="columns ">
                <div class="column">
                  <p class="title">
                    {{ definition.name }}
                  </p>
                </div>
              </div>
              <div class="columns">
                <div class="column has-text-left">
                  <p class="subtitle is-size-6">
                    {{ definition.definition }}
                  </p>
                </div>
              </div>
              <div class="columns">
                <div class="column has-text-right">
                  Ajouté par {{ definition.user.pseudo }}
                </div>
              </div>
            </div>
            <div class="column is-2">
              <BaseVote
                      @sendVote="updateNbVote()"
                      :nb-vote="definition.like"
              ></BaseVote>
            </div>
          </div>
        </div>
      </article>
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
import BaseVote from "./BaseVote"

export default {
  name: "OneDefinitions",
  components: { BaseVote },
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
            like: 1252
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
  cursor: default;
}
</style>
