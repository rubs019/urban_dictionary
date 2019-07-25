<template>
  <div class="tile is-parent notification is-white">
    <div class="tile is-child">
      <p class="title">{{ $t('menu_name.login') }}</p>
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
                    <b-field :label="$t('form.username')">
                      <b-input v-model="user.login"></b-input>
                    </b-field>

                    <b-field :label="$t('form.password')">
                      <b-input type="password" v-model="user.pwd"></b-input>
                    </b-field>
                  </div>
                  <b-button
                          :loading="status === Status.PENDING"
                          type="is-primary"
                          rounded
                          class="is-pulled-right"
                          native-type="submit"
                  >{{ $t('form.login.submitBtn') }}</b-button
                  >
                  <div class="content is-pulled-left">
                    <router-link :to="{ name: 'AppSignUp' }" class="is-size-7"
                    >{{ $t('form.noAccount') }}</router-link
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
import { STATUS } from "../constants"

export default {
  name: "VFormLogin",
  data: () => ({
    Status: STATUS,
    user: {
      login: "matoubi",
      pwd: "testtest"
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
