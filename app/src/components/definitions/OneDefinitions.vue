<template>
    <div class="one-definitions">
        <p>I am the One definitions components :)</p>
        <p>I'm here for show you the expressions u have asked</p>
        <p>When you will build this page, the definitions :</p>
        <h1>{{ $route.params.id }}</h1>
        <code v-if="definition">{{ definition}}</code>

        <article v-if="definition" class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ definition.name }}</strong> <small> @{{ definition.author }}</small>
                        <br>
                        {{ definition.definition }}
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-heart"></i></span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
  import axios from 'axios/index'
  export default {
    name: "OneDefinitions",
    data: () => ({
      definition: null
    }),
    async mounted() {
      try {
        const nameDefinition = this.$route.params.id
        const definition = await axios.get(`http://localhost:1337/definitions/${nameDefinition}`)

        this.definition = definition.data
      } catch (err) {
        console.log(err)
      }
    }
  };
</script>

<style scoped>
  .media {
      border: 1px solid #e1e1e1;
      box-shadow: 0 1px 0 0 #e1e1e1;
      border-radius: 4px;
      padding: 5px;
  }
  .media .content:not(:last-child) {
      margin: 0;
  }
</style>