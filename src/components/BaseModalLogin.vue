<template>
  <div id="app-login">
    <router-link
      :to="{ name: '/login' }"
      @click="isCardModalActive = true"
      :class="[isButton ? 'navbar-item' : 'button is-light']"
    >
      Log in
    </router-link>
    <b-modal
      :active.sync="isCardModalActive"
      :width="640"
      height="1000"
      scroll="keep"
    >
      <div class="tile is-parent notification is-light">
        <div class="tile is-child">
          <p class="title">Log in</p>
          <div class="subtitle">
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
                          class="button is-primary"
                          >Se connecter avec Google</b-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="columns">
              <div class="column is-10 is-offset-1">
                <span class="content has-text-centered">Ou</span>
                <template v-if="form.message">
                  <article class="is-size-6 message is-danger">
                    <div class="message-body">
                      {{ form.message }}
                    </div>
                  </article>
                </template>
                <div class="content has-text-left">
                  <b-field>
                    <b-input
                      placeholder="Nom d'utilisateur"
                      rounded
                      v-model="user.login"
                    ></b-input>
                  </b-field>

                  <b-field rounded>
                    <b-input
                      type="password"
                      placeholder="Votre mot de passe"
                      rounded
                      v-model="user.pwd"
                    ></b-input>
                  </b-field>

                  <b-button
                    type="is-primary"
                    class="is-pulled-right"
                    v-on:click="sendLogin()"
                    >Se connecter</b-button
                  >
                </div>
                <div class="content has-text-left">
                  <router-link
                    :to="{ name: '/inscriptions' }"
                    class="is-size-7 is-pulled-left"
                    >Vous n'avez pas encore de compte ?</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "BaseModalLogin",
  props: {
    isButton: Boolean
  },
  data() {
    return {
      isCardModalActive: false,
      form: {
        message: null
      },
      user: {
        login: null,
        pwd: null
      }
    }
  },
  methods: {
    sendLogin() {
      this.form.message = "Identifiant ou mot de passe incorrect"
      this.user.login = null
      this.user.pwd = null
    }
  }
}
</script>

<style scoped>
hr {
  background-color: #ababab;
  margin: 15px auto;
}
</style>
