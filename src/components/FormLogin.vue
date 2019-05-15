<template>
  <div class="tile is-parent notification is-white">
    <div class="tile is-child">
      <p class="title">Se connecter</p>
      <div class="subtitle">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="columns">
              <div class="column is-12">
                <template v-if="message">
                  <article class="is-size-6 message" :class="[color ? `is-${color}` : '']">
                    <div class="message-body">
                      {{ message }}
                    </div>
                  </article>
                </template>
                <form @submit.prevent="sendLogin">
                  <div class="content has-text-left" v-if="user">
                    <b-field label="Nom utilisateur">
                      <b-input v-model="user.login"></b-input>
                    </b-field>

                    <b-field label="Mot de passe">
                      <b-input type="password" v-model="user.pwd"></b-input>
                    </b-field>
                  </div>
                  <b-button
                          :loading="status === Status.PENDING"
                          type="is-primary"
                          rounded
                          class="is-pulled-right"
                          native-type="submit"
                  >Se connecter</b-button
                  >
                  <div class="content is-pulled-left">
                    <router-link :to="{ name: 'AppSignUp' }" class="is-size-7"
                    >Vous n'avez pas encore de compte ?</router-link
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <span class="content has-text-centered">Ou</span>
        <hr />

        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <div>
                    <p class="heading">Connexion avec Facebook</p>
                    <b-button
                      icon-left="facebook"
                      icon-pack="fab"
                      class="button is-info"
                      >Se connecter avec Facebook</b-button
                    >
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div>
                    <p class="heading">Connexion avec Google</p>
                    <b-button
                      icon-left="google-plus-square"
                      icon-pack="fab"
                      class="button is-danger"
                      >Se connecter avec Google</b-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STATUS } from "../constants"

export default {
  name: "FormLogin",
  data: () => ({
    Status: STATUS,
    user: {
      login: "Ruben",
      pwd: "null"
    }
  }),
  props: {
    message: String,
    color: String,
    status: Number
  },
  methods: {
    sendLogin() {
      this.$emit("login", this.user)
    }
  }
}
</script>

<style scoped></style>
