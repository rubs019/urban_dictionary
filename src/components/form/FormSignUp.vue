<template>
  <div class="tile is-parent notification is-white">
    <div class="tile is-child">
      <p class="title">S'inscrire</p>
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
                <form @submit.prevent="register">
                  <div class="content has-text-left" v-if="user">
                    <b-field label="Nom utilisateur">
                      <b-input v-model="user.login"></b-input>
                    </b-field>

                    <b-field label="Email">
                      <b-input type="email" v-model="user.email"></b-input>
                    </b-field>

                    <b-field label="Mot de passe">
                      <b-input type="password" v-model="user.pwd"></b-input>
                    </b-field>

                    <b-field label="Retaper votre mot de passe">
                      <b-input type="password" v-model="user.pwd2"></b-input>
                    </b-field>
                  </div>
                  <b-button
                          type="is-primary"
                          rounded
                          class="is-pulled-right"
                          native-type="submit"
                          :loading="status === Status.PENDING"
                  >S'inscrire</b-button
                  >
                  <div class="content is-pulled-left">
                    <router-link :to="{ name: 'AppLogIn' }" class="is-size-7"
                    >Vous avez déjà un compte ?</router-link
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { STATUS } from "../../constants"

export default {
  name: "FormLogin",
  props: {
    message: String,
    color: String,
    status: Number
  },
  data: () => ({
    Status: STATUS,
    formStatus: STATUS.DEFAULT,
    user: {
      login: "Ruben",
      email: "ruben.desert@gmail.com",
      pwd: "null",
      pwd2: "null"
    }
  }),
  methods: {
    register() {
      this.$emit("tryRegister", this.user)
    }
  }
}
</script>

<style scoped></style>
